import bcrypt from "bcrypt";
import { emailService } from "../services/emailService.js";
import db from "../config/db.js";

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

    // 3. Hashear la contraseña antes de guardarla (nunca se guarda en texto plano)
    const hashedPassword = await bcrypt.hash(password, 10);
    // "10" es el número de salt rounds (nivel de seguridad)

    // Determinamos si el usuario necesita aprobación
    const requiereAprobacion = tipo === "profesor" || tipo === "edit";
    const aprobado = !requiereAprobacion; // true para est y admin, false para profesor y editor

    // 4. Insertar nuevo usuario en la base de datos y devolver su id
    const result = await db.query(
      "INSERT INTO users (nombre, email, password, tipo, aprobado) VALUES ($1, $2, $3, $4, $5) RETURNING id, tipo, aprobado",
      [nombre, email, hashedPassword, tipo, aprobado] // Insertamos el usuario con la contraseña encriptada
    );

    // 5. Enviar correo de confirmación
    try {
      await emailService.enviarCorreoRegistro(email, nombre, tipo);
    } catch (emailError) {
      console.error("Error al enviar correo:", emailError);
      // No detenemos el registro si falla el correo
    }

    // 6. Respuesta exitosa con el id del nuevo usuario
    res.status(201).json({
      message: requiereAprobacion
        ? "Usuario registrado exitosamente. Revisa tu correo para más información."
        : "Usuario registrado exitosamente. Te hemos enviado un correo de confirmación.",
      userId: result.rows[0].id,
      tipo: result.rows[0].tipo,
      aprobado: result.rows[0].aprobado,
    });
  } catch (error) {
    // Manejo de errores inesperados (problemas con la BD, servidor, etc.)
    console.error("Error en registro:", error);
    res.status(500).json({
      message: "Error al registrar usuario",
    });
  }
};
