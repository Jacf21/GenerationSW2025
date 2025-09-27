const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');
const { validateRegister } = require('../middleware/validateRequest');

router.post('/register', validateRegister, register);

module.exports = router;