import pool from "../config/db.js";

export const crearTopico = async ({ titulo, orden = 0, descripcion = null }) => {
  const { rows } = await pool.query(
    `INSERT INTO topico (titulo, orden, descripcion, created_at)
     VALUES ($1, $2, $3, now()) RETURNING *`,
    [titulo, orden, descripcion]
  );
  return rows[0];
};

export const obtenerTopicos = async () => {
  const { rows } = await pool.query(`SELECT * FROM topico ORDER BY orden ASC, id DESC`);
  return rows;
};

export const obtenerTopico = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM topico WHERE id = $1`, [id]);
  return rows[0] ?? null;
};

export const updateTopico = async (id, { titulo, orden = 0, descripcion = null }) => {
  const { rows } = await pool.query(
    `UPDATE topico
     SET titulo = $1, orden = $2, descripcion = $3, updated_at = now()
     WHERE id = $4
     RETURNING *`,
    [titulo, orden, descripcion, id]
  );
  return rows[0] ?? null;
};

export const eliminarTopico = async (id) => {
  const { rowCount } = await pool.query(`DELETE FROM topico WHERE id = $1`, [id]);
  return rowCount > 0;
};
