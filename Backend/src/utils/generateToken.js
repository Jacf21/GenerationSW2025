import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, tipo: user.tipo }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
