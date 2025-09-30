exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Validar campos requeridos
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email y contraseña son requeridos'
    });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Formato de email inválido'
    });
  }

  next();
};