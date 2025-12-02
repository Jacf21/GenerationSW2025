import { useState } from "react";
import { crearTopico } from "../../services/topicoService.js";
import "./topicoForm.css";

export default function TopicoForm({ onCreado }) {
  const [tituloTopico, setTituloTopico] = useState("");
  const [ordenTopico, setOrdenTopico] = useState("");
  const [descripcionTopico, setDescripcionTopico] = useState("");
  const [mensajeTopico, setMensajeTopico] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const topico = await crearTopico({
        titulo: tituloTopico,
        orden: Number(ordenTopico),
        descripcion: descripcionTopico,
      });
      onCreado(topico);
      setTituloTopico("");
      setOrdenTopico("");
      setDescripcionTopico("");
      setMensajeTopico({ tipo: "exito", texto: "Tópico creado correctamente" });
    } catch (err) {
      setMensajeTopico({ tipo: "error", texto: err.message });
    }
  };

  return (
    <div className="topico-form-box">
      <h2 className="topico-form-header">Crear Tópico</h2>
      {mensajeTopico && (
        <p className={`topico-alert topico-alert-${mensajeTopico.tipo}`}>{mensajeTopico.texto}</p>
      )}
      <form onSubmit={handleSubmit} className="topico-form">
        <div className="topico-field">
          <label>Título</label>
          <input
            type="text"
            placeholder="Título del tópico"
            value={tituloTopico}
            onChange={(e) => setTituloTopico(e.target.value)}
            required
          />
        </div>

        <div className="topico-field">
          <label>Orden</label>
          <input
            type="number"
            placeholder="Orden"
            value={ordenTopico}
            onChange={(e) => setOrdenTopico(e.target.value)}
            required
          />
        </div>

        <div className="topico-field">
          <label>Descripción</label>
          <textarea
            placeholder="Ingresa una breve descripción"
            value={descripcionTopico}
            onChange={(e) => setDescripcionTopico(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="topico-btn">
          Crear Tópico
        </button>
      </form>
    </div>
  );
}
