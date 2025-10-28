import pool from "../config/db.js";
import { subirArchivo, eliminarArchivo } from "../config/googleDrive.js";

export const subirContenido = async (id_topico, tipo, file) => {
  try {
    //Buscar el tópico para obtener su carpeta Drive
    const topicoRes = await pool.query("SELECT drive_folder_id FROM topico WHERE id = $1", [
      id_topico,
    ]);
    if (topicoRes.rowCount === 0) throw new Error("Tópico no encontrado");

    const folderId = topicoRes.rows[0].drive_folder_id;

    //Subir el archivo al Drive
    const driveFile = await subirArchivo(file.path, file.originalname, file.mimetype, folderId);

    //Guardar registro en la base de datos
    const insert = await pool.query(
      `INSERT INTO contenidoTopico (id_topico, tipo, url, drive_file_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id_topico, tipo, driveFile.webViewLink, driveFile.id]
    );

    return insert.rows[0];
  } catch (error) {
    console.error("Error en crearContenido:", error);
    throw error;
  }
};

export const eliminarContenido = async (id, drive_file_id) => {
  if (drive_file_id) await eliminarArchivo(drive_file_id);
  await pool.query("DELETE FROM contenidoTopico WHERE id = $1;", [id]);
};

export const obtenerContenido = async (id) => {
  const { rows } = await pool.query("SELECT * FROM contenidoTopico WHERE id = $1;", [id]);
  return rows[0];
};
