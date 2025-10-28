import * as contenidoService from "../services/contenidoService.js";
import { obtenerTopico } from "../services/topicoService.js";

export const crearContenido = async (req, res) => {
  console.log("🔵 LLEGÓ A LA RUTA /api/contenido/up");
  console.log("🧾 BODY:", req.body);
  console.log("📎 FILE:", req.file);
  try {
    const { id_topico, tipo } = req.body;
    const topico = await obtenerTopico(id_topico);
    if (!topico) return res.status(404).json({ error: "Tópico no encontrado" });

    const file = req.file;

    const contenido = await contenidoService.subirContenido(Number(id_topico), tipo, file);

    res.status(201).json({
      message: "Contenido subido correctamente",
      data: contenido,
    });
  } catch (error) {
    console.error("Error al subir contenido:", error);
    res.status(500).json({ error: "Error al subir el contenido" });
  }
};

export const eliminarContenido = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el contenido en la BD
    const contenido = await contenidoService.obtenerContenido(id);
    if (!contenido) {
      return res.status(404).json({ error: "Contenido no encontrado" });
    }

    // Eliminar de Drive (si tiene drive_file_id) y BD
    await contenidoService.eliminarContenido(contenido.id, contenido.drive_file_id);

    res.json({ mensaje: "Contenido eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar contenido:", err.message);
    res.status(500).json({ error: "Error al eliminar contenido" });
  }
};
