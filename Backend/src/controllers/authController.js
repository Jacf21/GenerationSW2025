import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { findUserByEmail } from "../services/userService.js";
import { generateToken } from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    if (!user.aprobado) return res.status(403).json({ message: "Usuario no aprobado" });

    const token = generateToken(user);
    res.json({
      message: "Login exitoso",
      token,
      tipo: user.tipo,
      nombre: user.nombre,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
