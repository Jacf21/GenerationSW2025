import React, { useState, useEffect } from "react";
import useTopicos from "../../../../../hooks/useTopico";
import "./EditarTopico.css";
import MensajesTopicos from "../../ListarTopicos/MensajesTopicos/MensajesTopicos";

export default function EditarTopico({ topico, onClose }) {
  const { actualizarTopico } = useTopicos();
  const [formData, setFormData] = useState({
    titulo: topico?.titulo || "",
    orden: topico?.orden || 0,
    descripcion: topico?.descripcion || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (topico) {
      setFormData({
        titulo: topico.titulo,
        orden: topico.orden,
        descripcion: topico.descripcion || "",
      });
    }
  }, [topico]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await actualizarTopico(topico.id, formData);
      setShowToast(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || "Error al actualizar tópico");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Editar Tópico</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Orden:</label>
            <input
              type="number"
              value={formData.orden}
              onChange={(e) => setFormData({ ...formData, orden: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secundario">
              Cancelar
            </button>
            <button type="submit" className="btn-primario" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
      {showToast && (
        <MensajesTopicos
          message="¡Tópico actualizado exitosamente!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
