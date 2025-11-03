import ContenidoForm from "../../../components/formulario/contenidoForm.jsx";
import useTopicos from "../../../hooks/useTopico.js";
import "./formulariosTopicos.css";

export default function ContenidoFormPage() {
  const { topicos, agregarContenido } = useTopicos();

  return (
    <div>
      <h1>Subir Contenido</h1>
      <ContenidoForm
        topicos={topicos}
        onSubido={(nuevoContenido) => agregarContenido(nuevoContenido)}
      />
    </div>
  );
}
