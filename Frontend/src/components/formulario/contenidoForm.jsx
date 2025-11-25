import { useState } from "react";
import { subirContenido } from "../../services/contenidoService.js";
import "./contenidoForm.css"; // Importa su propio CSS

export default function ContenidoForm({ topicos, onSubido }) {
  const [topicoId, setTopicoId] = useState("");
  const [tipo, setTipo] = useState("text");
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivo) {
      setMensaje({ tipo: "error", texto: "Selecciona un archivo antes de enviar." });
      return;
    }

    try {
      const contenido = await subirContenido({ id_topico: topicoId, tipo, archivo });
      onSubido(contenido);
      setArchivo(null);
      setMensaje({ tipo: "exito", texto: "Contenido subido correctamente" });
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
    }
  };

  return (
    <div className="formulario-container">
      <h2>Agregar Contenido</h2>
      {mensaje && <p className={`mensaje mensaje-${mensaje.tipo}`}>{mensaje.texto}</p>}

      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label>Seleccionar Tópico</label>
          <select value={topicoId} onChange={(e) => setTopicoId(e.target.value)} required>
            <option value="">Seleccione un tópico</option>
            {topicos.map((t) => (
              <option key={t.id} value={t.id}>
                {t.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Tipo de Contenido</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="text">Texto</option>
            <option value="img">Imagen</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="slide">Slide</option>
            <option value="eval">Evaluación</option>
          </select>
        </div>

        <div className="campo">
          <label>Archivo</label>
          <input type="file" onChange={(e) => setArchivo(e.target.files[0])} required />
        </div>

        <button type="submit" className="boton">
          Subir Contenido
        </button>
      </form>
    </div>
  );
}
