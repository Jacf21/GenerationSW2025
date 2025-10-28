import pool from "../config/db.js";
import { crearCarpeta } from "../config/googleDrive.js";

export const crearTopico = async ({ titulo, orden, descripcion }) => {
  try {
    await pool.query("BEGIN");

    //Crear carpeta principal en Google Drive
    const carpetaTopico = await crearCarpeta(`Topico_${titulo}_${orden}`);

    //Insertar registro del tópico en la base de datos
    const insert = await pool.query(
      `INSERT INTO topico (titulo, orden, descripcion, drive_folder_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [titulo, orden, descripcion, carpetaTopico.id]
    );

    const topico = insert.rows[0];

    //Guardar ID de carpeta (si tu tabla tiene una columna 'drive_folder_id')
    await pool.query(`UPDATE topico SET drive_folder_id = $1 WHERE id = $2`, [
      carpetaTopico.id,
      topico.id,
    ]);

    await pool.query("COMMIT");

    return { ...topico, drive_folder_id: carpetaTopico.id };
  } catch (error) {
    await pool.query("ROLLBACK");
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
