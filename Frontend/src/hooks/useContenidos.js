import { useEffect, useState, useCallback } from "react";
import {
  obtenerContenidosPorTopico,
  obtenerTodosLosContenidos,
} from "../services/contenidoService";

export default function useContenidos(idTopico) {
  const [contenidos, setContenidos] = useState([]);
  const [loadingContenidos, setLoadingContenidos] = useState(false);
  const [errorContenidos, setErrorContenidos] = useState(null);

  const fetchContenidos = useCallback(async () => {
    setLoadingContenidos(true);
    try {
      let res;
      if (!idTopico) {
        // 🟢 Si no hay tópico seleccionado, traer todos los contenidos
        res = await obtenerTodosLosContenidos();
      } else {
        // 🔵 Si hay tópico seleccionado, traer solo los contenidos de ese tópico
        res = await obtenerContenidosPorTopico(idTopico);
      }
      setContenidos(res);
    } catch (err) {
      console.error("Error al cargar contenidos:", err);
      setErrorContenidos(err);
    } finally {
      setLoadingContenidos(false);
    }
  }, [idTopico]);

  useEffect(() => {
    fetchContenidos();
  }, [fetchContenidos]);

  const obtenerNombreArchivo = (ruta) => {
    if (!ruta) return "";
    const partes = ruta.split("-");
    return partes.length > 1 ? partes[partes.length - 1] : ruta;
  };

  return {
    contenidos,
    loadingContenidos,
    errorContenidos,
    fetchContenidos,
    obtenerNombreArchivo,
  };
}
