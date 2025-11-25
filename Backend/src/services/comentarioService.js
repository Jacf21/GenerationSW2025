import pool from "../config/db.js";

export const crearComentario = async ({
  id_topico,
  id_usuario = null,
  nombre_usuario,
  mensaje,
}) => {
  const query = `
    INSERT INTO topico_comentario (id_topico, id_usuario, nombre_usuario, mensaje, creado_at)
    VALUES ($1, $2, $3, $4, now())
    RETURNING id, id_topico, id_usuario, nombre_usuario, mensaje, creado_at
  `;
  const values = [id_topico, id_usuario, nombre_usuario, mensaje];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const obtenerComentariosPorTopico = async (id_topico) => {
  const query = `
    SELECT id, id_topico, id_usuario, nombre_usuario, mensaje, creado_at
    FROM topico_comentario
    WHERE id_topico = $1
    ORDER BY creado_at ASC
  `;
  const { rows } = await pool.query(query, [id_topico]);
  return rows;
};
