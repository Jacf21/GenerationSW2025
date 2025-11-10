import "./viewContenido.css";

export default function ViewContenidoModal({ onClose, contenido }) {
  const renderContenido = () => {
    const url = contenido.url;

    switch (contenido.tipo) {
      case "img":
        return (
          <img
            src={url}
            alt="contenido"
            className="max-h-[70vh] max-w-[90vw] object-contain mx-auto"
          />
        );
      case "video":
        return (
          <video src={url} controls className="max-h-[70vh] max-w-[90vw] mx-auto object-contain" />
        );
      case "audio":
        return <audio src={url} controls className="w-full" />;
      case "slide":
        return (
          <iframe
            src={url}
            title="slide"
            className="w-full max-h-[70vh] border rounded object-contain"
            allowFullScreen
          />
        );
      default:
        return (
          <iframe
            src={url}
            title="document"
            className="w-full max-h-[70vh] border rounded object-contain"
          />
        );
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content view-contenido-modal" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute text-align:right-2 top-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-3 text-center">Vista del Contenido</h3>
        <div className="flex justify-center items-center">{renderContenido()}</div>
      </div>
    </div>
  );
}
