import db from "../config/db.js";

/**
 * Agregar contenido a una pantalla en una posición
 */
export const agregarContenidoPantalla = async ({ id_pantalla, id_contenido, orden }) => {
  const { rows } = await db.query(
    `INSERT INTO contenidoPantallaTopico (id_pantalla, id_contenido, orden, fecha_creacion)
     VALUES ($1, $2, $3, NOW())
     RETURNING *`,
    [id_pantalla, id_contenido, orden]
  );
  return rows[0];
};

/**
 * Quitar contenido de una pantalla
 */
export const eliminarContenidoPantalla = async (id) => {
  const { rowCount } = await db.query(`DELETE FROM contenidoPantallaTopico WHERE id = $1`, [id]);
  return rowCount > 0;
};

/**
 * Obtener todos los contenidos de una pantalla
 */
export const obtenerContenidoDePantalla = async (id_pantalla) => {
  const { rows } = await db.query(
    `SELECT cpt.*, ct.tipo, ct.url
     FROM contenidoPantallaTopico cpt
     INNER JOIN contenidoTopico ct ON ct.id = cpt.id_contenido
     WHERE cpt.id_pantalla = $1
     ORDER BY cpt.id ASC`,
    [id_pantalla]
  );
  return rows;
};
