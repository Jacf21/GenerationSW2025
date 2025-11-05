import pool from "../config/db.js";

export const crearTopico = async ({ titulo, orden, descripcion }) => {
  try {
    const insert = await pool.query(
      `INSERT INTO topico (titulo, orden, descripcion)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [titulo, orden, descripcion]
    );
    return insert.rows[0];
  } catch (error) {
    console.error("Error en crearTopico:", error);
    throw error;
  }
};

export const obtenerTopicos = async () => {
  const { rows } = await pool.query("SELECT * FROM topico ORDER BY orden ASC");
  return rows;
};

export async function obtenerTopico(id) {
  const { rows } = await pool.query("SELECT * FROM topico WHERE id = $1;", [id]);
  return rows[0];
}

export async function eliminarTopico(id) {
  await pool.query("DELETE FROM topico WHERE id = $1;", [id]);
}
