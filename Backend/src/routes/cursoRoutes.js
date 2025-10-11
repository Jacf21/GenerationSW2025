// src/routes/cursoRoutes.js
import { Router } from "express";
import { crearCurso } from "../controllers/cursoController.js";
import { validarCrearCurso } from "../middleware/validateCurso.js";

const router = Router();

// Ruta POST para crear un nuevo curso
router.post("/crear-curso", validarCrearCurso, crearCurso);

export default router;
