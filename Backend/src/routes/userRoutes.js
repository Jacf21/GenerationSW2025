import express from "express";
import { register, verificarCodigo } from "../controllers/createUserController.js";
import { validateRegister } from "../middleware/validateRequest.js";
import { getAllUsers, cambiarAprobacionUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.get("/users", getAllUsers);
router.patch("/:id/aprobar", cambiarAprobacionUser);
router.post("/verify", verificarCodigo);

export default router;
