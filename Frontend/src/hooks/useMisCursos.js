import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContex.jsx";
import * as cursoService from "../services/cursoService.js";

const useMisCursos = () => {
  const { user } = useAuth();
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const fetchCursos = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await cursoService.getMisCursos(user.id);
      setCursos(Array.isArray(data) ? data : data.cursos || []);
    } catch (err) {
      setError(err.message || "Error al obtener los cursos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, [user]);

  const handleRowSelect = (curso) => setSelectedCurso(curso);

  return {
    cursos,
    isLoading,
    error,
    selectedCurso,
    handleRowSelect,
    recargar: fetchCursos,
  };
};

export default useMisCursos;
