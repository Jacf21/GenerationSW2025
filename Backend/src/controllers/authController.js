import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { findUserByEmail } from "../services/userService.js";
import { generateToken } from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  try {
    // 1. Validar los campos del request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 2. Extraer datos del cuerpo
    const { email, password } = req.body;

    // 3. Buscar usuario por email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // 4. Validar tipo de usuario
    const tiposValidos = ["est", "profesor", "admin", "edit"];
    if (!tiposValidos.includes(user.tipo)) {
      return res.status(400).json({ message: "Tipo de usuario no válido" });
    }

    // 5. Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 6. Verificar aprobación
    if (!user.aprobado) {
      return res.status(403).json({ message: `Usuario tipo ${user.tipo} no aprobado` });
    }

    // 7. Generar token
    const token = generateToken(user);

    // 8. Responder al cliente
    res.json({
      message: "Login exitoso",
      token,
      tipo: user.tipo,
      nombre: user.nombre,
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
