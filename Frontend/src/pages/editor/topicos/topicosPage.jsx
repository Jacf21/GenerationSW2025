import TopicoForm from "../../../components/formulario/topicoForm.jsx";
import ContenidoForm from "../../../components/formulario/contenidoForm.jsx";
import ContenidoList from "../../../components/contenidoList.jsx";
import useTopicos from "../../../hooks/useTopico.js";
import "./topicosPage.css";
import "./formulariosTopicos.css";

export default function TopicosPage() {
  const { topicos, contenidos, loading, agregarTopico, agregarContenido, eliminarContenido } =
    useTopicos();

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="topicos-container">
      <h1>Tópicos</h1>
      <TopicoForm onCreado={agregarTopico} />
      <ContenidoForm topicos={topicos} onSubido={agregarContenido} />

      {topicos.map((t) => (
        <div className="topico-section" key={t.id}>
          <h2>{t.titulo}</h2>
          <ContenidoList
            className="contenido-list"
            contenidos={contenidos[t.id] || []}
            onEliminado={(id) => eliminarContenido(t.id, id)}
          />
        </div>
      ))}
    </div>
  );
}
