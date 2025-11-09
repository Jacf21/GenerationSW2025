import { useState, useEffect } from "react";
import * as topicoService from "../services/topicoService";

export default function useTopicos() {
  const [topicos, setTopicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarTopicos = async () => {
    try {
      setLoading(true);
      const data = await topicoService.obtenerTopicos();
      setTopicos(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const agregarTopico = async (nuevoTopico) => {
    try {
      const data = await topicoService.crearTopico(nuevoTopico);
      setTopicos((prevTopicos) => [...prevTopicos, data.data]);
      return data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const actualizarTopico = async (id, topicoActualizado) => {
    try {
      const data = await topicoService.actualizarTopico(id, topicoActualizado);
      setTopicos((prevTopicos) => prevTopicos.map((t) => (t.id === id ? data.data : t)));
      return data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const eliminarTopico = async (id) => {
    try {
      await topicoService.eliminarTopico(id);
      setTopicos((prevTopicos) => prevTopicos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    cargarTopicos();
  }, []);

  return {
    topicos,
    loading,
    error,
    cargarTopicos,
    agregarTopico,
    actualizarTopico,
    eliminarTopico,
  };
}
