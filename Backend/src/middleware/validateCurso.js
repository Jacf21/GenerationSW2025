// src/middleware/validateCurso.js

export const validarCrearCurso = (req, res, next) => {
  const { nombre, fecha_ini, fecha_fin } = req.body;

  // Validar campos obligatorios
  if (!nombre || !fecha_ini || !fecha_fin) {
    return res.status(400).json({
      error: "Faltan campos obligatorios.",
      detalles: "Asegúrate de proporcionar nombre, fecha_ini y fecha_fin.",
    });
  }

  // Validar tipos de datos
  if (typeof nombre !== "string") {
    return res.status(400).json({
      error: "El nombre debe ser un texto válido.",
    });
  }

  // Validar formato de fecha YYYY-MM-DD
  const esFechaValida = (fecha) => /^\d{4}-\d{2}-\d{2}$/.test(fecha) && !isNaN(Date.parse(fecha));

  if (!esFechaValida(fecha_ini) || !esFechaValida(fecha_fin)) {
    return res.status(400).json({
      error: "Formato de fecha inválido.",
      detalles: "Usa un formato de fecha válido (YYYY-MM-DD).",
    });
  }

  // Validar longitud del nombre
  const nombreLimpio = nombre.trim();
  if (nombreLimpio.length < 5 || nombreLimpio.length > 100) {
    return res.status(400).json({
      error: "El nombre del curso debe tener entre 5 y 100 caracteres.",
    });
  }

  // Validar orden de fechas
  if (new Date(fecha_ini) >= new Date(fecha_fin)) {
    return res.status(400).json({
      error: "La fecha de inicio debe ser anterior a la fecha de fin.",
    });
  }

  next();
};
