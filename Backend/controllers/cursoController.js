const cursoService = require('../services/cursoServices');
const utilsCurso = require('../utils/cursoUtils');
const bcrypt = require('bcrypt');

const crearCurso = async (req, res) => {
    const { nombre, fecha_ini, fecha_fin} = req.body;

    try {
        const codigoGenerado = await utilsCurso.generarCodigoUnico();
        const saltRounds = 10;
        const codigoHashed = await bcrypt.hash(codigoGenerado, saltRounds);

        const nuevoCurso = await cursoService.crearCurso(
            nombre, 
            fecha_ini, 
            fecha_fin, 
            codigoHashed
        );
        
        res.status(201).json({ 
            message: 'Curso creado exitosamente', 
            curso: {
                ...nuevoCurso,
                codigo: codigoGenerado
            }
        });

    } catch (error) {
        console.error("Error al crear curso:", error);
        res.status(500).json({ error: 'Error interno del servidor al crear el curso.' });
    }
};

module.exports = { crearCurso};