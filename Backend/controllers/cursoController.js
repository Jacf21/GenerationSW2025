const cursoService = require('../services/cursoService');
const bcrypt = require('bcrypt');

const crearCurso = async (req, res) => {
    // Desestructurar y Validar
    const { nombre, fecha_ini, fecha_fin, codigo } = req.body;

    if (!nombre || !fecha_ini || !fecha_fin || !codigo) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    try {
        // Seguridad
        const saltRounds = 10;
        const contrasenaHashed = await bcrypt.hash(codigo, saltRounds);

        const nuevoCurso = await cursoService.crearCurso(
            nombre, 
            fecha_ini, 
            fecha_fin, 
            contrasenaHashed
        );
        
        // Respuesta Exitosa
        res.status(201).json({ 
            message: 'Curso creado exitosamente', 
            curso: nuevoCurso
        });

    } catch (error) {
        console.error("Error al crear curso:", error);
        res.status(500).json({ error: 'Error interno del servidor al crear el curso.' });
    }
};

module.exports = { crearCurso };