import { useEffect, useState } from "react";
import { obtenerPantallaPorTopico } from "../services/pantallaTopicoService";
import { obtenerContenidosDePantalla } from "../services/contenidoPantallaTopicoService";
import { obtenerTopicos } from "../services/topicoService";

export default function usePantallaEstudiante(id_topico) {
  const [pantalla, setPantalla] = useState(null);
  const [contenidosPantalla, setContenidosPantalla] = useState([]);
  const [topicos, setTopicos] = useState([]);
  const [topicoActualIndex, setTopicoActualIndex] = useState(null);

  useEffect(() => {
    cargarTopicos();
  }, []);

  useEffect(() => {
    if (id_topico) cargarPantalla();
  }, [id_topico, topicos]);

  const cargarTopicos = async () => {
    try {
      const res = await obtenerTopicos();
      const lista = res.data || []; // ✅ aseguramos un array
      setTopicos(lista);

      const index = lista.findIndex((t) => t.id === Number(id_topico));
      setTopicoActualIndex(index);
    } catch (err) {
      console.error("Error cargando tópicos:", err);
      setTopicos([]);
      setTopicoActualIndex(null);
    }
  };

  const cargarPantalla = async () => {
    try {
      const p = await obtenerPantallaPorTopico(id_topico);
      if (!p || !p.visible) {
        setPantalla(null);
        setContenidosPantalla([]);
        return;
      }

      setPantalla(p);
      const lista = await obtenerContenidosDePantalla(p.id);
      setContenidosPantalla(lista.sort((a, b) => a.orden - b.orden));
    } catch (err) {
      console.error("Error cargando pantalla:", err);
      setPantalla(null);
      setContenidosPantalla([]);
    }
  };

  const siguienteTopico = () => {
    if (topicoActualIndex !== null && topicoActualIndex < topicos.length - 1) {
      return topicos[topicoActualIndex + 1].id;
    }
    return null;
  };

  const anteriorTopico = () => {
    if (topicoActualIndex !== null && topicoActualIndex > 0) {
      return topicos[topicoActualIndex - 1].id;
    }
    return null;
  };

  return {
    pantalla,
    contenidosPantalla,
    siguienteTopico,
    anteriorTopico,
  };
}
