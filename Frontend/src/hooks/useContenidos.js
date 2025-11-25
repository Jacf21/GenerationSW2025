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
        res = await obtenerTodosLosContenidos();
      } else {
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
