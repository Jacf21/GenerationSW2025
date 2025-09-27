// services/cursoService.js

const pool = require('../config/db'); // Asume que tienes tu pool de PostgreSQL aquí

/**
 * Inserta un nuevo curso en la base de datos.
 * @param {string} nombre - Nombre del curso.
 * @param {string} fecha_ini - Fecha de inicio.
 * @param {string} fecha_fin - Fecha de fin.
 * @param {string} contrasenaHashed - Contraseña ya hasheada.
 * @returns {object} El registro del curso creado (id, nombre).
 */
const crearCurso = async (nombre, fecha_ini, fecha_fin, contrasenaHashed) => {
    const query = `
        INSERT INTO curso (nombre, fecha_ini, fecha_fin, contrasena)
        VALUES ($1, $2, $3, $4)
        RETURNING id, nombre;
    `;
    const values = [nombre, fecha_ini, fecha_fin, contrasenaHashed];
    
    // Usamos pool.query para ejecutar la consulta
    const result = await pool.query(query, values);
    
    // Devolvemos el primer registro insertado
    return result.rows[0];
};

module.exports = { crearCurso };