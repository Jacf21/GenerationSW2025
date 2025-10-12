// Middleware para validar los datos del registro antes de llegar al controlador
export const validateRegister = (req, res, next) => {
  const { nombre, email, password, tipo } = req.body; // Extrae los datos enviados desde el frontend

  // 1. Validar que todos los campos estén presentes
  if (!nombre || !email || !password || !tipo) {
    return res.status(400).json({
      message: "Todos los campos son requeridos",
    });
  }

  // 2. Validar formato de email con expresión regular
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Debe tener formato básico usuario@dominio.ext
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Formato de email debe ser válido @gmail.com  ",
    });
  }

  // 3. Validar longitud de la contraseña
  if (password.length < 8) {
    return res.status(400).json({
      message: "La contraseña debe tener al menos 8 caracteres",
    });
  }

  // 4. Validar tipo de usuario (solo se permiten estos valores)
  const tiposValidos = ["est", "profesor", "admin"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      message: "Tipo de usuario no válido",
    });
  }

  // 5. Si todas las validaciones pasan, continúa con la siguiente función (controlador)
  next();
};
