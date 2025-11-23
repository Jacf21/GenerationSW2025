import {
  obtenerCursoPorCodigo,
  estaMatriculado,
  matricular,
  obtenerMatriculasDeUsuario,
} from "../services/matriculaService.js";

export const enrollByCode = async (req, res) => {
  try {
    const { codigo, id_usuario } = req.body;
    if (!codigo || !id_usuario) {
      return res.status(400).json({ message: "Faltan 'codigo' o 'id_usuario'" });
    }

    const curso = await obtenerCursoPorCodigo(codigo);
    if (!curso) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }
    if (curso.activo === false) {
      return res.status(409).json({ message: "El curso está inactivo" });
    }

    const yaMatriculado = await estaMatriculado(id_usuario, curso.id);
    if (yaMatriculado) {
      return res.status(409).json({ message: "Ya estás matriculado en este curso" });
    }

    const m = await matricular(id_usuario, curso.id);
    return res.status(201).json({ message: "Matriculación exitosa", data: { ...m, curso } });
  } catch (err) {
    console.error("Error en matriculación:", err);
    return res.status(500).json({ message: "Error al matricularse" });
  }
};

export const getMisMatriculas = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    if (!id_usuario) {
      return res.status(400).json({ message: "Falta 'id_usuario'" });
    }
    const rows = await obtenerMatriculasDeUsuario(Number(id_usuario));
    return res.json({ data: rows });
  } catch (err) {
    console.error("Error al obtener matriculas:", err);
    return res.status(500).json({ message: "Error al obtener matriculas" });
  }
};