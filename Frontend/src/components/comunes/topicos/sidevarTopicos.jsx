import {
  FaFile,
  FaFileImage,
  FaFileVideo,
  FaFileAudio,
  FaFileAlt,
  FaFilePowerpoint,
} from "react-icons/fa";

export default function SidebarTopicos({ topicos, contenidos, onSeleccionarContenido }) {
  const getIcono = (tipo) => {
    switch (tipo) {
      case "img":
        return <FaFileImage />;
      case "video":
        return <FaFileVideo />;
      case "audio":
        return <FaFileAudio />;
      case "slide":
        return <FaFilePowerpoint />;
      case "eval":
        return <FaFileAlt />;
      default:
        return <FaFile />;
    }
  };

  return (
    <div className="sidebar-topicos">
      <h3>Lista de Tópicos</h3>
      {topicos.map((t, index) => (
        <div
          key={t.id}
          className="topico-section"
          style={{ "--topico-color": `hsla(${(index * 60) % 360}, 70%, 30%, 0.3)` }} // color transparente
        >
          <h4>{t.titulo}</h4>
          <ul>
            {(contenidos[t.id] || []).map((c) => (
              <li key={c.id} onClick={() => onSeleccionarContenido(c)} className="contenido-item">
                <span className="icono">{getIcono(c.tipo)}</span> {c.nombre_archivo}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
