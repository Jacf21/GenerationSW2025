import { useState } from "react";
import { eliminarContenido } from "../../../../../services/contenidoService.js";
import "./deleteContenido.css";

export default function DeleteContenidoModal({ onClose, onSuccess, contenido }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await eliminarContenido(contenido.id);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar contenido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-3">¿Eliminar este contenido?</h3>
        <p className="text-gray-600 mb-4">
          Esta acción no se puede deshacer. Se eliminará el archivo y sus datos asociados.
        </p>
        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="btn-cancelar">
            Cancelar
          </button>
          <button onClick={handleDelete} disabled={loading} className="btn-eliminar">
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
