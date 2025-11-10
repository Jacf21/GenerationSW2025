import { useState } from "react";
import { subirContenido } from "../../../../../services/contenidoService.js";
import "./editContenido.css";

export default function EditContenidoModal({ onClose, onSuccess, contenido }) {
  const [tipo, setTipo] = useState(contenido?.tipo || "text");
  const [archivo, setArchivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const tipos = ["text", "img", "video", "audio", "slide", "eval"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { archivo, id_topico: contenido.id_topico, tipo };

    try {
      setLoading(true);
      await subirContenido(data); // reemplazar con PUT si tienes endpoint
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error al actualizar contenido:", err);
      alert("Error al actualizar contenido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold mb-4">Editar Contenido</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-2 py-1"
            >
              {tipos.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nuevo archivo (opcional)</label>
            <input
              type="file"
              onChange={(e) => setArchivo(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-2 py-1"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-cancelar">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="btn-guardar">
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
