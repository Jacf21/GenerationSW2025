import React, { useState } from "react";
import useTopicos from "../../../../../hooks/useTopico";
import "./CrearTopico.css";

export default function CrearTopico({ onClose }) {
  const { agregarTopico } = useTopicos();
  const [formData, setFormData] = useState({
    titulo: "",
    orden: 0,
    descripcion: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = { ...formData, orden: formData.orden === "" ? 0 : Number(formData.orden) };
      await agregarTopico(payload);
      onClose();
    } catch (err) {
      setError(err.message || "Error al crear tópico");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <h3>Crear Nuevo Tópico</h3>
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
              value={formData.orden === "" ? "" : formData.orden}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  orden: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
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
              {loading ? "Creando..." : "Crear Tópico"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
