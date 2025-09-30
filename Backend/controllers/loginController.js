const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Intento de login para:', email);

    // Buscar usuario por email
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      console.log('Usuario no encontrado:', email);
      return res.status(401).json({
        message: 'El correo no está registrado'
      });
    }

    const usuario = result.rows[0];
    console.log('Usuario encontrado:', usuario.email);

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password);
    console.log('Contraseña válida:', passwordValida);
    
    if (!passwordValida) {
      return res.status(401).json({
        message: 'Contraseña incorrecta'
      });
    }

    // Verificar rol válido
    if (!['est', 'profesor', 'admin'].includes(usuario.tipo)) {
      return res.status(401).json({
        message: 'Rol de usuario no válido'
      });
    }

    console.log('Login exitoso para:', usuario.email);

    // Enviar respuesta exitosa
    res.json({
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        tipo: usuario.tipo
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      message: 'Error al iniciar sesión'
    });
  }
};