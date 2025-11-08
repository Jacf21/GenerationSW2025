import ContenidoForm from "../../../components/formulario/contenidoForm.jsx";
import useTopicos from "../../../hooks/useTopico.js";
import "./contenidoFormPage.css";

export default function ContenidoFormPage() {
  const { topicos, agregarContenido } = useTopicos();

  return (
    <div className="contenido-form-page">
      <header className="contenido-header">
        <h1 className="contenido-titulo">Subir Contenido a los Tópicos</h1>
      </header>
      <main className="contenido-main">
        <ContenidoForm
          topicos={topicos}
          onSubido={(nuevoContenido) => agregarContenido(nuevoContenido)}
        />
      </main>
    </div>
  );
}
