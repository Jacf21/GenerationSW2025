import { useState, useEffect } from "react";
import { obtenerTopicos } from "../services/topicoService.js";
import { obtenerContenidosPorTopico } from "../services/contenidoService.js";

export default function useTopicos() {
  const [topicos, setTopicos] = useState([]);
  const [contenidos, setContenidos] = useState({}); // { topicoId: [contenidos] }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const t = await obtenerTopicos();
      setTopicos(t);

      const contenidosData = {};
      for (let topico of t) {
        contenidosData[topico.id] = await obtenerContenidosPorTopico(topico.id);
      }
      setContenidos(contenidosData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const agregarTopico = (topico) => {
    setTopicos([...topicos, topico]);
    setContenidos({ ...contenidos, [topico.id]: [] });
  };

  const agregarContenido = (contenido) => {
    const id_topico = contenido.id_topico;
    setContenidos({
      ...contenidos,
      [id_topico]: [...contenidos[id_topico], contenido],
    });
  };

  const eliminarContenido = (id_topico, id_contenido) => {
    setContenidos({
      ...contenidos,
      [id_topico]: contenidos[id_topico].filter((c) => c.id !== id_contenido),
    });
  };

  return {
    topicos,
    contenidos,
    loading,
    agregarTopico,
    agregarContenido,
    eliminarContenido,
    cargarDatos,
  };
}
