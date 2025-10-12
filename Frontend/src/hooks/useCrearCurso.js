import { useState } from "react";
import { crearCursoAPI } from "../services/cursoService";

const useCrearCurso = () => {
  // Estado inicial del formulario
  const initialFormData = {
    nombre: "",
    fecha_ini: "",
    fecha_fin: "",
    codigo: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [mensaje, setMensaje] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setIsLoading(true);

    try {
      const data = await crearCursoAPI(formData);

      setMensaje({
        type: "success",
        text: `Curso "${data.curso.nombre}" creado con éxito! con codigo "${data.curso.codigo}"`,
      });
      setFormData(initialFormData); // Limpiar formulario
    } catch (error) {
      console.error("Error al crear el curso:", error);
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
    mensaje,
    isLoading,
    handleChange,
    handleSubmit,
    clearMensaje: () => setMensaje(null),
  };
};

export default useCrearCurso;
