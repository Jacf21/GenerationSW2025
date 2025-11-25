export default function VistaPreviaContenido({ contenido }) {
  if (!contenido) {
    return <div className="vista-previa">Selecciona un contenido para visualizarlo 📄</div>;
  }

  const extractFileId = (url) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const fileId = extractFileId(contenido.url);
  const previewUrl = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : contenido.url;

  return (
    <div className="vista-previa">
      <h2>{contenido.nombre_archivo}</h2>
      {contenido.tipo === "img" ? (
        <img src={contenido.url} alt={contenido.nombre_archivo} className="preview-imagen" />
      ) : (
        <iframe
          src={previewUrl}
          title={contenido.nombre_archivo}
          className="iframe-preview"
          allow="autoplay"
        ></iframe>
      )}
    </div>
  );
}
