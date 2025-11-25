import {
  agregarContenidoPantalla,
  eliminarContenidoPantalla,
  obtenerContenidoDePantalla,
} from "../services/contenidoPantallaTopicoService.js";

export const agregarContenido = async (req, res) => {
  try {
    const contenido = await agregarContenidoPantalla(req.body);
    res.json(contenido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const eliminarContenido = async (req, res) => {
  try {
    const ok = await eliminarContenidoPantalla(req.params.id);
    res.json({ eliminado: ok });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const obtenerContenidos = async (req, res) => {
  try {
    const contenidos = await obtenerContenidoDePantalla(req.params.id_pantalla);
    res.json(contenidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
