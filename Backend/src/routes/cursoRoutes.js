// src/routes/cursoRoutes.js
import { Router } from "express";
import {
  crearCurso,
  getMisCursos,
  actualizarCurso,
  desactivarCurso,
} from "../controllers/cursoController.js";
import { validarCrearCurso } from "../middleware/validateCurso.js";

const router = Router();

// Ruta POST para crear un nuevo curso
router.post("/crear-curso", validarCrearCurso, crearCurso);
router.get("/:id/mis-cursos", getMisCursos);
// Actualizar curso
router.put("/update/:id", actualizarCurso);
// Desactivar curso (soft delete)
router.patch("/:id/desactivar", desactivarCurso);

export default router;
