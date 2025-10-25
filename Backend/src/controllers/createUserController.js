import bcrypt from "bcrypt";
import { emailService } from "../services/emailService.js";
import { emailTemplates, transporter } from "../config/emailConfig.js";
import db from "../config/db.js";
import { setCodigo, getCodigo, deleteCodigo } from "../utils/codigoVerificacionStore.js";

export const register = async (req, res) => {
  const { nombre, email, password, tipo } = req.body; // Extrae los datos enviados desde el frontend

  try {
    // 1. Verificar si el email ya está registrado en la BD
    const userExists = await db.query(
      "SELECT * FROM users WHERE email = $1", // Consulta por email
      [email] // Parametro seguro (previene SQL Injection)
    );

    if (userExists.rows.length > 0) {
      // Si el email ya existe, devolvemos error 400
      return res.status(400).json({
        message: "El email ya está registrado",
      });
    }

    // 2. Validar el tipo de usuario (solo puede ser: est, profesor o admin)
    const tiposValidos = ["est", "profesor", "admin", "edit"];
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({
        message: "Tipo de usuario no válido",
      });
    }

    // Generar código de 6 dígitos y guardar en memoria
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    setCodigo(email, codigo);

    // Enviar correo con el código
    await emailService.enviarCodigoVerificacion(email, nombre, codigo);

    // No creamos el usuario aún, solo devolvemos éxito y email
    res.status(200).json({
      message: "Código de verificación enviado al correo",
      email,
    });
  } catch (error) {
    // Manejo de errores inesperados (problemas con la BD, servidor, etc.)
    console.error("Error en registro:", error);
    res.status(500).json({
      message: "Error al registrar usuario",
    });
  }
};

export const verificarCodigo = async (req, res) => {
  const { email, codigo, nombre, password, tipo } = req.body;

  try {
    // Verificar código en memoria
    const codigoGuardado = getCodigo(email);
    if (!codigoGuardado || codigoGuardado !== codigo) {
      return res.status(400).json({ message: "Código incorrecto o expirado" });
    }

    // Crear usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const requiereAprobacion = tipo === "profesor" || tipo === "edit";
    const aprobado = !requiereAprobacion;

    const result = await db.query(
      "INSERT INTO users (nombre, email, password, tipo, aprobado, verificado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, tipo, aprobado",
      [nombre, email, hashedPassword, tipo, aprobado, true]
    );

    // Enviar correo de bienvenida después de verificar
    await transporter.sendMail({
      from: `"Sistema Generación de Software" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: emailTemplates.registro(nombre, tipo).subject,
      html: emailTemplates.registro(nombre, tipo).html,
    });

    // Eliminar código de memoria
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
