const bcrypt = require('bcrypt');        // Librería para hashear contraseñas
const db = require('../config/db');      // Conexión a la base de datos PostgreSQL

// Controlador para registrar usuarios
exports.register = async (req, res) => {
  const { nombre, email, password, tipo } = req.body; // Extrae los datos enviados desde el frontend

  try {
    // 1. Verificar si el email ya está registrado en la BD
    const userExists = await db.query(
      'SELECT * FROM users WHERE email = $1', // Consulta por email
      [email]                                // Parametro seguro (previene SQL Injection)
    );

    if (userExists.rows.length > 0) {
      // Si el email ya existe, devolvemos error 400
      return res.status(400).json({ 
        message: 'El email ya está registrado' 
      });
    }

    // 2. Validar el tipo de usuario (solo puede ser: est, profesor o admin)
    const tiposValidos = ['est', 'profesor', 'admin'];
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({ 
        message: 'Tipo de usuario no válido' 
      });
    }

    // 3. Hashear la contraseña antes de guardarla (nunca se guarda en texto plano)
    const hashedPassword = await bcrypt.hash(password, 10); 
    // "10" es el número de salt rounds (nivel de seguridad)

    // 4. Insertar nuevo usuario en la base de datos y devolver su id
    const result = await db.query(
      'INSERT INTO users (nombre, email, password, tipo) VALUES ($1, $2, $3, $4) RETURNING id',
      [nombre, email, hashedPassword, tipo] // Insertamos el usuario con la contraseña encriptada
    );

    // 5. Respuesta exitosa con el id del nuevo usuario
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      userId: result.rows[0].id
    });

  } catch (error) {
    // Manejo de errores inesperados (problemas con la BD, servidor, etc.)
    console.error('Error en registro:', error);
    res.status(500).json({ 
      message: 'Error al registrar usuario' 
    });
  }
};
