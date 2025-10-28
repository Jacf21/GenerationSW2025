import { eliminarContenido } from "../services/contenidoService.js";

export default function ContenidoList({ contenidos, onEliminado }) {
  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar contenido? Esta acción no se puede deshacer.")) return;
    try {
      await eliminarContenido(id);
      onEliminado(id);
    } catch (err) {
      alert(err.message);
    }
  };

  if (!contenidos || contenidos.length === 0) {
    return <p className="texto-vacio">No hay contenidos disponibles para este tópico.</p>;
  }

  return (
    <div className="contenido-list">
      {contenidos.map((c) => (
        <div key={c.id} className="contenido-item">
          <div className="contenido-info">
            <p className="contenido-titulo">
              <strong>Tipo:</strong> {c.tipo.toUpperCase()}
            </p>
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="contenido-enlace">
              Ver contenido
            </a>
          </div>
          <button className="boton-eliminar" onClick={() => handleEliminar(c.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}
