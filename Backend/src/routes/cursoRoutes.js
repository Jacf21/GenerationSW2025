// src/routes/cursoRoutes.js
import { Router } from "express";
import { crearCurso, getMisCursos } from "../controllers/cursoController.js";
import { validarCrearCurso } from "../middleware/validateCurso.js";

const router = Router();

// Ruta POST para crear un nuevo curso
router.post("/crear-curso", validarCrearCurso, crearCurso);
router.get("/:id/mis-cursos", getMisCursos);

export default router;
