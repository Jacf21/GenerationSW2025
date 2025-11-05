import { useState } from "react";
import { crearTopico } from "../../services/topicoService.js";

export default function TopicoForm({ onCreado }) {
  const [titulo, setTitulo] = useState("");
  const [orden, setOrden] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const topico = await crearTopico({
        titulo,
        orden: Number(orden),
        descripcion,
      });
      onCreado(topico);
      setTitulo("");
      setOrden("");
      setDescripcion("");
      setMensaje({ tipo: "exito", texto: "Tópico creado correctamente" });
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
    }
  };

  return (
    <div className="formulario-container">
      <h2>Crear Tópico</h2>
      {mensaje && <p className={`mensaje mensaje-${mensaje.tipo}`}>{mensaje.texto}</p>}

      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>Título</label>
          <input
            type="text"
            placeholder="Título del tópico"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Orden</label>
          <input
            type="number"
            placeholder="Orden"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Descripción</label>
          <textarea
            placeholder="Ingresa una breve descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="boton">
          Crear Tópico
        </button>
      </form>
    </div>
  );
}
