import * as comentarioService from "../services/comentarioService.js";

export const postComentario = async (req, res) => {
  try {
    const { id_topico } = req.params;
    const { mensaje } = req.body;

    if (!mensaje || mensaje.trim() === "") {
      return res.status(400).json({ message: "Mensaje vacío" });
    }

    // En producción toma id_usuario/nombre_usuario desde req.user (auth middleware)
    const id_usuario = req.user?.id ?? null;
    const nombre_usuario = req.user?.nombre ?? req.body.nombre_usuario ?? "Anónimo";

    const nuevo = await comentarioService.crearComentario({
      id_topico: Number(id_topico),
      id_usuario,
      nombre_usuario,
      mensaje,
    });

    res.status(201).json({ data: nuevo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getComentarios = async (req, res) => {
  try {
    const { id_topico } = req.params;
    const comentarios = await comentarioService.obtenerComentariosPorTopico(Number(id_topico));
    res.json({ data: comentarios });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
