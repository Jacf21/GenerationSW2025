import React, { useState } from "react";
import useTopicos from "../../../../../hooks/useTopico";
import "./EliminarTopico.css";

export default function EliminarTopico({ topico, onClose }) {
  const { eliminarTopico } = useTopicos();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEliminar = async () => {
    setLoading(true);
    setError("");

    try {
      await eliminarTopico(topico.id);
      onClose();
    } catch (err) {
      setError(err.message || "Error al eliminar tópico");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Eliminar Tópico</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="modal-body">
          <p>¿Está seguro que desea eliminar el siguiente tópico?</p>
          <div className="topico-info">
            <p>
              <strong>Título:</strong> {topico.titulo}
            </p>
            <p>
              <strong>Orden:</strong> {topico.orden}
            </p>
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="btn-secundario">
            Cancelar
          </button>
          <button onClick={handleEliminar} className="btn-eliminar" disabled={loading}>
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
