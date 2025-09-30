const validarCrearCurso = (req, res, next) => {
    const { nombre, fecha_ini, fecha_fin} = req.body;

    if (!nombre || !fecha_ini || !fecha_fin) {
        return res.status(400).json({ 
            error: 'Faltan campos obligatorios.',
            detalles: 'Asegúrate de proporcionar nombre, fecha_ini, fecha_fin.'
        });
    }

    if (nombre.length < 5 || nombre.length > 100) {
        return res.status(400).json({ 
            error: 'El nombre del curso debe tener entre 5 y 100 caracteres.' 
        });
    }

    if (new Date(fecha_ini) >= new Date(fecha_fin)) {
        return res.status(400).json({ 
            error: 'La fecha de inicio debe ser anterior a la fecha de fin.' 
        });
    }
    
    next();
};

module.exports = { validarCrearCurso };