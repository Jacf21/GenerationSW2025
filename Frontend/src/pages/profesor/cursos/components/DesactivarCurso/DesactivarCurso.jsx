import React, { useState } from "react";
import { desactivarCurso } from "../../../../../services/cursoService.js";
import MensajesTopicos from "../../../../editor/topicos/ListarTopicos/MensajesTopicos/MensajesTopicos.jsx";
import "./DesactivarCurso.css";

export default function DesactivarCurso({ curso, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleDesactivar = async () => {
    setLoading(true);
    setError("");
    try {
      await desactivarCurso(curso.id);
      setShowToast(true);
      onSuccess && onSuccess();
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || "Error al desactivar curso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Desactivar Curso</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <p>
          ¿Deseas desactivar el curso <strong>{curso?.nombre}</strong>? Podrás activarlo más tarde.
        </p>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-secundario">
            Cancelar
          </button>
          <button onClick={handleDesactivar} disabled={loading} className="btn-eliminar">
            {loading ? "Desactivando..." : "Desactivar"}
          </button>
        </div>
      </div>
      {showToast && (
        <MensajesTopicos
          message="¡Curso desactivado exitosamente!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
