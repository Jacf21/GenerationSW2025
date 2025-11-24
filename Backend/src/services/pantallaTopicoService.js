import db from "../config/db.js";

/**
 * Crear una pantalla de tópico (plantilla)
 */
export const crearPantallaTopico = async ({
  id_topico,
  id_editor,
  visible = false,
  descripcion = null,
}) => {
  const { rows } = await db.query(
    `INSERT INTO pantallaTopico (id_topico, id_editor, visible, descripcion, fecha_creacion)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING *`,
    [id_topico, id_editor, visible, descripcion]
  );
  return rows[0];
};

/**
 * Obtener la pantalla para un tópico
 */
export const obtenerPantallaPorTopico = async (id_topico) => {
  const { rows } = await db.query(
    `SELECT * FROM pantallaTopico WHERE id_topico = $1 ORDER BY id DESC LIMIT 1`,
    [id_topico]
  );
  return rows[0] ?? null;
};

/**
 * Obtener una pantalla por ID
 */
export const obtenerPantalla = async (id) => {
  const { rows } = await db.query(`SELECT * FROM pantallaTopico WHERE id = $1`, [id]);
  return rows[0] ?? null;
};

/**
 * Actualizar pantallaTopico (cambiar visibilidad, descripcion, etc.)
 */
export const updatePantallaTopico = async (id, { visible, descripcion }) => {
  const { rows } = await db.query(
    `UPDATE pantallaTopico
     SET visible = $1,
         descripcion = $2
     WHERE id = $3
     RETURNING *`,
    [visible, descripcion, id]
  );
  return rows[0] ?? null;
};
