import { useState } from "react";
import { useAuth } from "../context/AuthContex.jsx";
import * as cursoService from "../services/cursoService.js"; // ⚠️ Importación como objeto

const useCrearCurso = () => {
  const { user } = useAuth();

  const initialFormData = {
    nombre: "",
    fecha_ini: "",
    fecha_fin: "",
    descripcion: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validarCurso = (curso) => {
    const nuevosErrores = {};

    if (!curso.nombre?.trim()) {
      nuevosErrores.nombre = "El nombre del curso es obligatorio.";
    } else if (curso.nombre.length < 3) {
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!curso.fecha_ini) {
      nuevosErrores.fecha_ini = "La fecha de inicio es obligatoria.";
    }

    if (!curso.fecha_fin) {
      nuevosErrores.fecha_fin = "La fecha de finalización es obligatoria.";
    } else if (curso.fecha_ini) {
      const fechaInicio = new Date(curso.fecha_ini + "T00:00:00");
      const fechaFin = new Date(curso.fecha_fin + "T00:00:00");
      if (fechaFin < fechaInicio) {
        nuevosErrores.fecha_fin = "La fecha de finalización no puede ser anterior a la de inicio.";
      }
    }

    if (!curso.descripcion?.trim()) {
      nuevosErrores.descripcion = "La descripción del curso es obligatorio.";
    } else if (curso.descripcion.length < 10) {
      nuevosErrores.descripcion = "La descripción debe tener al menos 3 caracteres.";
    }

    return nuevosErrores;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setIsLoading(true);

    const nuevosErrores = validarCurso(formData);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setIsLoading(false);
      return;
    }

    console.log(user.id);

    try {
      const data = await cursoService.crearCursoAPI(formData, user.id);
      setMensaje({
        type: "success",
        text: `Curso "${data.curso.nombre}" creado con éxito! con código "${data.curso.codigo}"`,
      });
      setFormData(initialFormData);
      setErrores({});
    } catch (error) {
      setMensaje({
        type: "error",
        text: error.message || "Error de conexión. Inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errores,
    mensaje,
    isLoading,
    handleChange,
    handleSubmit,
    setFormData,
    clearMensaje: () => setMensaje(null),
  };
};

export default useCrearCurso;
