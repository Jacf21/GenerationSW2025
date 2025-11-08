import bcrypt from "bcrypt";
import db from "../config/db.js";
import { setCodigo, getCodigo, deleteCodigo } from "../utils/codigoVerificacionStore.js";
import { emailService } from "./emailService.js";
import { emailTemplates, transporter } from "../config/emailConfig.js";

export const iniciarRegistro = async ({ nombre, email, password, tipo }) => {
  // 1. Verificar si el email ya está registrado en la BD
  const userExists = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  if (userExists.rows.length > 0) {
    throw new Error("El email ya está registrado");
  }

  // 2. Validar el tipo de usuario
  const tiposValidos = ["est", "profesor", "admin", "edit"];
  if (!tiposValidos.includes(tipo)) {
    throw new Error("Tipo de usuario no válido");
  }z

  // 3. Generar código y guardar en memoria
  const codigo = Math.floor(100000 + Math.random() * 900000).toString();
  setCodigo(email, codigo);

  // 4. Enviar correo con el código
  await emailService.enviarCodigoVerificacion(email, nombre, codigo);

  // 5. Retornar email para frontend
  return { message: "Código de verificación enviado al correo", email };
};

export const verificarYCrearUsuario = async ({ email, codigo, nombre, password, tipo }) => {
  // 1. Verificar código en memoria
  const codigoGuardado = getCodigo(email);
  if (!codigoGuardado || codigoGuardado !== codigo) {
    throw new Error("Código incorrecto o expirado");
  }

  // 2. Crear usuario
  const hashedPassword = await bcrypt.hash(password, 10);
  const requiereAprobacion = tipo === "profesor" || tipo === "edit";
  const aprobado = !requiereAprobacion;

  const result = await db.query(
    "INSERT INTO users (nombre, email, password, tipo, aprobado, verificado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, tipo, aprobado",
    [nombre, email, hashedPassword, tipo, aprobado, true]
  );

  // 3. Enviar correo de bienvenida
  await transporter.sendMail({
    from: `"Sistema Generación de Software" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: emailTemplates.registro(nombre, tipo).subject,
    html: emailTemplates.registro(nombre, tipo).html,
  });

  // 4. Eliminar código de memoria
  deleteCodigo(email);

  return {
    message: "Usuario creado y verificado exitosamente",
    userId: result.rows[0].id,
    tipo: result.rows[0].tipo,
    aprobado: result.rows[0].aprobado,
  };
};
