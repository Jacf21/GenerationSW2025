import * as cursoService from "../services/cursoServices.js";
import * as utilsCurso from "../utils/cursoUtils.js";
//import { hash } from "bcryptjs";

export const crearCurso = async (req, res) => {
  const { nombre, fecha_ini, fecha_fin, descripcion, id_user } = req.body;

  try {
    const codigoGenerado = await utilsCurso.generarCodigoUnico();
    //const saltRounds = 10;
    //const codigoHashed = await hash(codigoGenerado, saltRounds);

    const nuevoCurso = await cursoService.crearCurso(
      nombre,
      fecha_ini,
      fecha_fin,
      codigoGenerado,
      descripcion,
      id_user
    );

    res.status(201).json({
      message: "Curso creado exitosamente",
      curso: {
        ...nuevoCurso,
        codigo: codigoGenerado,
      },
    });
  } catch (error) {
    console.error("Error al crear curso:", error);
    res.status(500).json({ error: "Error interno del servidor al crear el curso." });
  }
};

export const getMisCursos = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Falta el parámetro 'id' del usuario" });
  }

  try {
    const cursos = await cursoService.getCursos(id);

    if (cursos.length === 0) {
      return res.status(404).json({ message: "No tiene cursos creados" });
    }

    return res.status(200).json(cursos);
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    return res.status(500).json({
      message: "Error al obtener los cursos",
      error: error.message,
    });
  }
};
