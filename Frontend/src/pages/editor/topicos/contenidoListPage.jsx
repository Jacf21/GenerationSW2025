import { useParams } from "react-router-dom";
import ContenidoList from "../../../components/contenidoList.jsx";
import useTopicos from "../../../hooks/useTopico.js";
import "./contenidoListPage.css";

export default function ContenidoListPage() {
  const { id_topico } = useParams();
  const { contenidos, loading, eliminarContenido } = useTopicos();

  if (loading) return <p>Cargando...</p>;

  const lista = contenidos[id_topico] || [];

  return (
    <div>
      <h1>Contenidos del Tópico {id_topico}</h1>
      <ContenidoList contenidos={lista} onEliminado={(id) => eliminarContenido(id_topico, id)} />
    </div>
  );
}
