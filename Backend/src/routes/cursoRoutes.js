const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/cursoController");
const { validarCrearCurso } = require("../middleware/validateCurso");

// Ruta POST para crear un nuevo curso
router.post("/crear-curso", validarCrearCurso, cursoController.crearCurso);

module.exports = router;
