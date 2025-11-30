import ContenidoForm from "../../../../../components/formulario/contenidoForm";
import "./addContenido.css";

export default function AddContenidoModal({ topicos, onClose, onSuccess }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Título del modal */}
        <h3 className="text-xl font-semibold mb-4">Agregar Contenido</h3>

        {/* Formulario */}
        <ContenidoForm
          topicos={topicos}
          onSubido={() => {
            onSuccess(); // recarga la lista
            onClose(); // cierra el modal
          }}
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
