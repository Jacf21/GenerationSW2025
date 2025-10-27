// src/services/cursoServices.js
import pool from "../config/db.js";

export const crearCurso = async (
  nombre,
  fecha_ini,
  fecha_fin,
  codigoHashed,
  descripcion,
  id_user
) => {
  const query = `
    INSERT INTO curso (nombre, fecha_ini, fecha_fin, codigo, descripcion, id_usuario)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, nombre;
  `;
  const values = [nombre, fecha_ini, fecha_fin, codigoHashed, descripcion, id_user];

  // Usamos pool.query para ejecutar la consulta
  const result = await pool.query(query, values);

  // Devolvemos el primer registro insertado
  return result.rows[0];
};

export const buscarCursoPorCodigo = async (codigo) => {
  const query = "SELECT id FROM curso WHERE codigo = $1";
  const values = [codigo];

  const result = await pool.query(query, values);

  // Retorna el primer curso si existe, o undefined si no hay resultados
  return result.rows[0];
};

export const getCursos = async (id_user) => {
  const result = await pool.query("SELECT * FROM curso where id_usuario = $1", [id_user]);
  return result.rows;
};
