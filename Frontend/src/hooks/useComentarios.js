import { useState, useEffect } from "react";
import apiRequest from "../services/apiCliente";

export default function useComentarios(idTopico) {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargar = async () => {
    if (!idTopico) {
      setComentarios([]);
      return;
    }
    try {
      setLoading(true);
      const json = await apiRequest(`/comentarios/topico/${idTopico}`);
      setComentarios(json.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const crear = async ({ mensaje, nombre_usuario }) => {
    if (!idTopico) throw new Error("idTopico requerido");
    const json = await apiRequest(`/comentarios/topico/${idTopico}`, {
      method: "POST",
      body: JSON.stringify({ mensaje, nombre_usuario }),
    });
    await cargar();
    return json.data;
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTopico]);

  return { comentarios, loading, error, cargar, crear, setComentarios };
}
