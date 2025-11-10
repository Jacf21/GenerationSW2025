//import "./viewContenido.css";

export default function ViewContenidoModal({ onClose, contenido }) {
  const renderContenido = () => {
    const url = contenido.url;

    switch (contenido.tipo) {
      case "img":
        return (
          <img
            src={url}
            alt="contenido"
            className="max-h-[70vh] max-w-full object-contain mx-auto"
          />
        );
      case "video":
        return <video src={url} controls className="max-h-[70vh] max-w-full mx-auto" />;
      case "audio":
        return <audio src={url} controls className="w-full" />;
      case "slide":
        return (
          <iframe
            src={url}
            title="slide"
            className="w-full max-h-[70vh] border rounded"
            allowFullScreen
          />
        );
      case "text":
      case "eval":
      default:
        return <iframe src={url} title="document" className="w-full max-h-[70vh] border rounded" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-3">Vista del Contenido</h3>
        {renderContenido()}
      </div>
    </div>
  );
}
