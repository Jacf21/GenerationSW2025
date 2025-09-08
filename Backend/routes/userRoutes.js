const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { getUsers } = require('../controllers/userController');

// Define una ruta GET para /
// Cuando el frontend haga una petición a /api/users, se ejecutará getUsers
router.get('/', getUsers);

// Exporta el router para que `index.js` pueda usarlo
module.exports = router;