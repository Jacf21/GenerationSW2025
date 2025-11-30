import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContex";
import {
  obtenerPantallaPorTopico,
  crearPantallaTopico,
  actualizarPantalla,
} from "../services/pantallaTopicoService";
import { obtenerContenidosPorTopico } from "../services/contenidoService";
import {
  agregarContenidoAplantilla,
  obtenerContenidosDePantalla,
  eliminarContenidoDePantalla,
} from "../services/contenidoPantallaTopicoService";

const PORT = parseInt(import.meta.env.VITE_PORTBACK) || 5000;

export default function useEditorPantallaTopico(id_topico) {
  const [pantalla, setPantalla] = useState(null);
  const [contenidos, setContenidos] = useState([]);
  const [contenidosPantalla, setContenidosPantalla] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!id_topico) return; // ⬅️ agregado
    cargarPantalla();
    cargarContenidos();
  }, [id_topico]);

  const id_editor = user?.id;

  const cargarPantalla = async () => {
    let p = await obtenerPantallaPorTopico(id_topico);
    if (!p)
      p = await crearPantallaTopico({ id_topico, id_editor, visible: false, descripcion: "" });
    setPantalla(p);
    const lista = await obtenerContenidosDePantalla(p.id);
    setContenidosPantalla(lista);
  };

  const cargarContenidos = async () => {
    const lista = await obtenerContenidosPorTopico(id_topico);
    setContenidos(lista);
  };

  const agregarContenido = async (id_contenido) => {
    await agregarContenidoAplantilla({
      id_pantalla: pantalla.id,
      id_contenido,
      orden: contenidosPantalla.length + 1,
    });
    cargarPantalla();
  };

  const borrarAsignacion = async (id) => {
    await eliminarContenidoDePantalla(id);
    cargarPantalla();
  };

  const cambiarVisibilidad = async () => {
    const p = await actualizarPantalla(pantalla.id, {
      visible: !pantalla.visible,
      descripcion: pantalla.descripcion,
    });
    setPantalla(p);
  };

  // Nueva función para drag & drop
  const reordenar = async (sourceIndex, destinationIndex) => {
    if (destinationIndex == null || sourceIndex === destinationIndex) return;

    const items = Array.from(contenidosPantalla);
    const [moved] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, moved);

    // Actualizamos el orden en backend
    for (let i = 0; i < items.length; i++) {
      await fetch(`http://localhost:${PORT}/api/contenido-pantalla/${items[i].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orden: i + 1 }),
      });
    }

    setContenidosPantalla(items);
  };

  return {
    pantalla,
    contenidos,
    contenidosPantalla,
    agregarContenido,
    borrarAsignacion,
    cambiarVisibilidad,
    reordenar,
  };
}
