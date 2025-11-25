import pool from "../config/db.js";

export const obtenerCursoPorCodigo = async (codigo) => {
  const { rows } = await pool.query("SELECT * FROM curso WHERE codigo = $1", [codigo]);
  return rows[0] ?? null;
};

export const estaMatriculado = async (id_usuario, id_curso) => {
  const { rows } = await pool.query(
    "SELECT 1 FROM matriculacurso WHERE id_usuario = $1 AND id_curso = $2",
    [id_usuario, id_curso]
  );
  return rows.length > 0;
};

export const matricular = async (id_usuario, id_curso) => {
  const { rows } = await pool.query(
    `INSERT INTO matriculacurso (id_usuario, id_curso, fecha_matricula)
     VALUES ($1, $2, now()) RETURNING *`,
    [id_usuario, id_curso]
  );
  return rows[0];
};

export const obtenerMatriculasDeUsuario = async (id_usuario) => {
  const { rows } = await pool.query(
    `SELECT m.id, m.fecha_matricula, c.id AS id_curso, c.nombre, c.descripcion, c.fecha_ini, c.fecha_fin, c.codigo, c.activo
     FROM matriculacurso m
     JOIN curso c ON c.id = m.id_curso
     WHERE m.id_usuario = $1
     ORDER BY m.fecha_matricula DESC`,
    [id_usuario]
  );
  return rows;
};
