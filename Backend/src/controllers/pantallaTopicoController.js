import {
  crearPantallaTopico,
  obtenerPantallaPorTopico,
  obtenerPantalla,
  updatePantallaTopico,
} from "../services/pantallaTopicoService.js";

export const crearPantalla = async (req, res) => {
  try {
    const pantalla = await crearPantallaTopico(req.body);
    res.json(pantalla);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPantallaPorTopico = async (req, res) => {
  try {
    const pantalla = await obtenerPantallaPorTopico(req.params.id_topico);
    res.json(pantalla);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPantalla = async (req, res) => {
  try {
    const pantalla = await obtenerPantalla(req.params.id);
    res.json(pantalla);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarPantalla = async (req, res) => {
  try {
    const pantalla = await updatePantallaTopico(req.params.id, req.body);
    res.json(pantalla);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
