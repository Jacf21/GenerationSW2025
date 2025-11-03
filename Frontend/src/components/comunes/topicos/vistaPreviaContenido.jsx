export default function VistaPreviaContenido({ contenido }) {
  if (!contenido) {
    return <div className="vista-previa">Selecciona un contenido para visualizarlo 📄</div>;
  }

  // Extraer el ID del archivo desde la URL (más robusto)
  const extractFileId = (url) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const fileId = extractFileId(contenido.url);
  const previewUrl = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : contenido.url;

  return (
    <div className="vista-previa">
      <h2>{contenido.nombre_archivo}</h2>
      <iframe
        src={previewUrl}
        title={contenido.nombre_archivo}
        className="iframe-preview"
        allow="autoplay"
      ></iframe>
    </div>
  );
}
