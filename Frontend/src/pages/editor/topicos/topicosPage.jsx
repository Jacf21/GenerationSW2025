import TopicoForm from "../../../components/formulario/topicoForm.jsx";
import useTopicos from "../../../hooks/useTopico.js";
import "./formulariosTopicos.css";

export default function TopicosPage() {
  const { topicos, loading, agregarTopico } = useTopicos();

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="topicos-container">
      <h1>Tópicos</h1>
      <TopicoForm onCreado={agregarTopico} />

      <ul>
        {topicos.map((t) => (
          <li key={t.id}>
            {t.titulo} - <a href={`/contenido/${t.id}`}>Ver Contenidos</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
