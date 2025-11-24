import React, { useState, useEffect } from "react";
import { actualizarCurso } from "../../../../../services/cursoService.js";
import MensajesTopicos from "../../../../editor/topicos/ListarTopicos/MensajesTopicos/MensajesTopicos.jsx";
import "./EditarCurso.css";

export default function EditarCurso({ curso, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nombre: curso?.nombre || "",
    fecha_ini: curso?.fecha_ini ? curso.fecha_ini.slice(0, 10) : "",
    fecha_fin: curso?.fecha_fin ? curso.fecha_fin.slice(0, 10) : "",
    descripcion: curso?.descripcion || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (curso) {
      setFormData({
        nombre: curso.nombre,
        fecha_ini: new Date(curso.fecha_ini).toISOString().slice(0, 10),
        fecha_fin: new Date(curso.fecha_fin).toISOString().slice(0, 10),
        descripcion: curso.descripcion || "",
      });
    }
  }, [curso]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await actualizarCurso(curso.id, formData);
      setShowToast(true);
      onSuccess && onSuccess();
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || "Error al actualizar curso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Editar Curso</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha Inicio:</label>
              <input
                type="date"
                value={formData.fecha_ini}
                onChange={(e) => setFormData({ ...formData, fecha_ini: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Fecha Fin:</label>
              <input
                type="date"
                value={formData.fecha_fin}
                onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secundario">Cancelar</button>
            <button type="submit" className="btn-primario" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>

      {showToast && (
        <MensajesTopicos
          message="¡Curso actualizado exitosamente!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}