import * as contenidoService from "../services/contenidoService.js";
import { obtenerTopico } from "../services/topicoService.js";

export const crearContenido = async (req, res) => {
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
    const contenido = await contenidoService.obtenerContenido(id);
    if (!contenido) return res.status(404).json({ error: "Contenido no encontrado" });

    await contenidoService.eliminarContenido(contenido.id, contenido.storage_path);

    res.json({ mensaje: "Contenido eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar contenido:", err.message);
    res.status(500).json({ error: "Error al eliminar contenido" });
  }
};

export const obtenerContenidosPorTopico = async (req, res) => {
  try {
    const { id_topico } = req.params;
    const contenidos = await contenidoService.obtenerContenidosPorTopico(Number(id_topico));
    res.json({
      message: "Contenidos obtenidos correctamente",
      data: contenidos,
    });
  } catch (error) {
    console.error("Error al obtener contenidos:", error);
    res.status(500).json({ error: "Error al obtener contenidos" });
  }
};
