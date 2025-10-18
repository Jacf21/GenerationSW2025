import express from "express";
import { body } from "express-validator";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email inválido"),
    body("password").notEmpty().withMessage("Contraseña requerida"),
  ],
  loginUser
);

export default router;
