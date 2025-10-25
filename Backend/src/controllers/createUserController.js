import bcrypt from "bcrypt";
import { emailService } from "../services/emailService.js";
import pool from "../config/db.js";
import { setCodigo, getCodigo, deleteCodigo } from "../utils/codigoVerificacionStore.js";

export const register = async (req, res) => {
  const { nombre, email, tipo } = req.body;

  try {
    // 1️⃣ Verificar si el email ya está registrado
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // 2️⃣ Validar tipo de usuario
    const tiposValidos = ["est", "profesor", "admin", "edit"];
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({ message: "Tipo de usuario no válido" });
    }

    // 3️⃣ Generar código de verificación
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    setCodigo(email, codigo);

    // 4️⃣ Enviar correo con el código
    await emailService.enviarCodigoVerificacion(email, nombre, codigo);

    res.status(200).json({
      message: "Código de verificación enviado al correo",
      email,
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const verificarCodigo = async (req, res) => {
  const { email, codigo, nombre, password, tipo } = req.body;

  try {
    // 1️⃣ Verificar código guardado en memoria
    const codigoGuardado = getCodigo(email);
    if (!codigoGuardado || codigoGuardado !== String(codigo)) {
      return res.status(400).json({ message: "Código incorrecto o expirado" });
    }

    // 2️⃣ Crear usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const requiereAprobacion = tipo === "profesor" || tipo === "edit";
    const aprobado = !requiereAprobacion;

    const result = await pool.query(
      "INSERT INTO users (nombre, email, password, tipo, aprobado, verificado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, tipo, aprobado",
      [nombre, email, hashedPassword, tipo, aprobado, true]
    );

    // 3️⃣ Enviar correo de bienvenida
    await emailService.registro(email, nombre, tipo);

    // 4️⃣ Borrar código temporal
    deleteCodigo(email);

    res.status(201).json({
      message: "Usuario creado y verificado exitosamente",
      userId: result.rows[0].id,
      tipo: result.rows[0].tipo,
      aprobado: result.rows[0].aprobado,
    });
  } catch (error) {
    console.error("Error en verificación:", error);
    res.status(500).json({ message: "Error al verificar código" });
  }
};
