import { useState } from "react";
import useTopicos from "../../../hooks/useTopico";
import SidebarTopicos from "../../../components/comunes/topicos/sidevarTopicos";
import VistaPreviaContenido from "../../../components/comunes/topicos/vistaPreviaContenido";
import "./topicosViewerPage.css";

export default function TopicosViewerPage() {
  const { topicos, contenidos, loading } = useTopicos();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState(null);

  if (loading) return <p>Cargando...</p>;

  const handleSeleccionarContenido = (contenido) => {
    setContenidoSeleccionado(contenido);
  };

  return (
    <div className="topicos-viewer-container">
      <button className="toggle-button" onClick={() => setSidebarVisible(!sidebarVisible)}>
        {sidebarVisible ? "Ocultar Lista" : "Mostrar Lista"}
      </button>

      <div className="layout-viewer">
        {sidebarVisible && (
          <SidebarTopicos
            topicos={topicos}
            contenidos={contenidos}
            onSeleccionarContenido={handleSeleccionarContenido}
          />
        )}

        <VistaPreviaContenido contenido={contenidoSeleccionado} />
      </div>
    </div>
  );
}
