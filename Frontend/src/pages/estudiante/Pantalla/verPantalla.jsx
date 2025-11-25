// src/pages/PantallaEstudiantePage.jsx
import { useParams, useNavigate } from "react-router-dom";
import usePantallaEstudiante from "../../../hooks/usePantallaEstudiante";
import BloqueContenidoEstudiante from "../../../components/pantallaTopico/BloqueContenidoEstudiante";

export default function PantallaEstudiantePage() {
  const { id_topico } = useParams();
  const navigate = useNavigate();

  const { pantalla, contenidosPantalla, siguienteTopico, anteriorTopico } =
    usePantallaEstudiante(id_topico);

  const idNext = siguienteTopico();
  const idPrev = anteriorTopico();

  return (
    <div style={{ padding: 20 }}>
      <h1>Tópico #{id_topico}</h1>

      <button onClick={() => navigate("/lista-topicos-est")}>← Volver a la lista</button>

      {!pantalla && <p>Este tópico no tiene contenido publicado aún.</p>}

      {pantalla && (
        <>
          <div style={{ display: "flex", gap: 10, margin: "20px 0" }}>
            {idPrev && <button onClick={() => navigate(`/topico/${idPrev}`)}>← Anterior</button>}
            {idNext && <button onClick={() => navigate(`/topico/${idNext}`)}>Siguiente →</button>}
          </div>

          {contenidosPantalla.map((item) => (
            <BloqueContenidoEstudiante key={item.id} item={item} />
          ))}

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {idPrev && <button onClick={() => navigate(`/topico/${idPrev}`)}>← Anterior</button>}
            {idNext && <button onClick={() => navigate(`/topico/${idNext}`)}>Siguiente →</button>}
          </div>
        </>
      )}
    </div>
  );
}
