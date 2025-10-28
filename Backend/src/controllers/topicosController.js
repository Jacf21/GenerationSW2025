import * as topicoService from "../services/topicoService.js";

export const crearTopico = async (req, res) => {
  try {
    const { titulo, orden, descripcion } = req.body;
    const nuevoTopico = await topicoService.crearTopico({ titulo, orden, descripcion });
    res.status(201).json({
      message: "Tópico creado correctamente",
      data: nuevoTopico,
    });
  } catch (error) {
    console.error("Error al crear tópico:", error);
    res.status(500).json({ error: "Error al crear el tópico" });
  }
};

export const obtenerTopicos = async (req, res) => {
  try {
    const lista = await topicoService.obtenerTopicos();
    res.json(lista);
  } catch (error) {
    console.error("Error al obtener tópicos:", error);
    res.status(500).json({ error: "Error al obtener los tópicos" });
  }
};

export const obtenerTopico = async (req, res) => {
  try {
    const { id } = req.params;
    const topico = await topicoService.obtenerTopico(id);
    res.json(topico);
  } catch (error) {
    console.error("Error al obtener tópicos:", error);
    res.status(500).json({ error: "Error al obtener los tópicos" });
  }
};

export const eliminarTopico = async (req, res) => {
  try {
    const { id } = req.params;
    await topicoService.eliminarTopico(id);
    res.json({ mensaje: "Tópico eliminado" });
  } catch (err) {
    console.error("Error al eliminar tópico:", err.message);
    res.status(500).json({ error: "Error al eliminar tópico" });
  }
};
