import pool from "../config/db.js";
import { supabase } from "../config/supabase.js";
import fs from "fs";

export const subirContenido = async (id_topico, tipo, file) => {
  try {
    const topicoRes = await pool.query("SELECT * FROM topico WHERE id = $1", [id_topico]);
    if (topicoRes.rowCount === 0) throw new Error("Tópico no encontrado");

    const filename = `topicos/${id_topico}/${Date.now()}-${file.originalname}`;
    const fileBuffer = fs.readFileSync(file.path);

    const { data, error } = await supabase.storage
      .from("tutorial-media")
      .upload(filename, fileBuffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const { data: publicData } = supabase.storage.from("tutorial-media").getPublicUrl(filename);

    const publicUrl = publicData.publicUrl;

    const insert = await pool.query(
      `INSERT INTO contenidoTopico (id_topico, tipo, url, storage_path)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id_topico, tipo, publicUrl, filename]
    );

    return insert.rows[0];
  } catch (error) {
    console.error("Error en subirContenido:", error);
    throw error;
  }
};

export const eliminarContenido = async (id, storage_path) => {
  try {
    if (storage_path) {
      await supabase.storage
        .from("tutorial-media")
        .remove([storage_path])
        .catch(() => null);
    }
    await pool.query("DELETE FROM contenidoTopico WHERE id = $1;", [id]);
  } catch (err) {
    console.error("Error al eliminar contenido:", err);
    throw err;
  }
};

export const obtenerContenido = async (id) => {
  const { rows } = await pool.query("SELECT * FROM contenidoTopico WHERE id = $1;", [id]);
  return rows[0];
};

export const obtenerContenidosPorTopico = async (id_topico) => {
  const { rows } = await pool.query(
    "SELECT * FROM contenidoTopico WHERE id_topico = $1 ORDER BY id DESC;",
    [id_topico]
  );
  return rows;
};
