import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import useComentarios from "../../../../../hooks/useComentarios";
import "./Comentarios.css";

export default function ComentariosModal({ topicoId, onClose, usuario }) {
  const { comentarios, loading, error, cargar, crear } = useComentarios(topicoId);
  const [mensaje, setMensaje] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [comentarios, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;
    try {
      await crear({ mensaje, nombre_usuario: usuario?.nombre ?? "Anónimo" });
      setMensaje("");
    } catch (err) {
      console.error(err);
      alert(err.message || "No se pudo enviar comentario");
    }
  };

  return (
    <div className="cm-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cm-modal" role="dialog" aria-modal="true">
        <header className="cm-header">
          <h3>Comentarios — Tópico #{topicoId}</h3>
          <button className="cm-close" onClick={onClose} aria-label="Cerrar">
            <FaTimes />
          </button>
        </header>

        <div className="cm-body" ref={listRef}>
          {loading && <div className="cm-loading">Cargando...</div>}
          {error && <div className="cm-error">{error}</div>}
          {!loading && comentarios.length === 0 && <div className="cm-empty">Sin comentarios</div>}
          <ul className="cm-list">
            {comentarios.map((c) => (
              <li key={c.id} className="cm-item">
                <div className="cm-item-head">
                  <strong className="cm-user">{c.nombre_usuario}</strong>
                  <span className="cm-time">{new Date(c.creado_at).toLocaleString()}</span>
                </div>
                <div className="cm-message">{c.mensaje}</div>
              </li>
            ))}
          </ul>
        </div>

        <form className="cm-form" onSubmit={handleSubmit}>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe un comentario..."
            rows={3}
          />
          <div className="cm-actions">
            <button type="button" className="cm-btn" onClick={onClose}>
              Cerrar
            </button>
            <button type="submit" className="cm-btn cm-btn-primary">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
