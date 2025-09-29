
const pool = require('../config/db');

const crearCurso = async (nombre, fecha_ini, fecha_fin, codigoHashed) => {
    const query = `
        INSERT INTO curso (nombre, fecha_ini, fecha_fin, codigo)
        VALUES ($1, $2, $3, $4)
        RETURNING id, nombre;
    `;
    const values = [nombre, fecha_ini, fecha_fin, codigoHashed];
    
    // Usamos pool.query para ejecutar la consulta
    const result = await pool.query(query, values);
    
    // Devolvemos el primer registro insertado
    return result.rows[0];
};

const buscarCursoPorCodigo = async (codigo) => {
    const query = 'SELECT id FROM curso WHERE codigo = $1';
    const values = [codigo];
    const result = await pool.query(query, values);
    // Retorna el primer curso si existe, o undefined si no hay resultados
    return result.rows[0]; 
};

module.exports = { crearCurso, buscarCursoPorCodigo};