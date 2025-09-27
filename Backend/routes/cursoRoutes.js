const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

// Ruta POST para crear un nuevo curso
router.post('/crear-curso', cursoController.crearCurso);

module.exports = router;