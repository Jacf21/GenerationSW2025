import TopicoForm from "../../../components/formulario/topicoForm.jsx";
import useTopicos from "../../../hooks/useTopico.js";

import "./TopicosPage.css";

export default function TopicosPage() {
  const { topicos, loading, agregarTopico } = useTopicos();

  if (loading) return <p className="loading-text">Cargando...</p>;

  return (
    <div className="topicos-page">
      <div className="topicos-header">
        <h1>Crear Nuevo Topico</h1>
      </div>
      <TopicoForm onCreado={agregarTopico} />
    </div>
  );
}
