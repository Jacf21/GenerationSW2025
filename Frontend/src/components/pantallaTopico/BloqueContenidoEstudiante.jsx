import { useEffect, useState } from "react";
import "../../styles/htmlViewer.css";

export default function BloqueContenidoEstudiante({ item }) {
  const [htmlContent, setHtmlContent] = useState(null);

  useEffect(() => {
    if (item.tipo === "text") {
      fetch(item.url)
        .then((res) => res.text())
        .then((text) => setHtmlContent(text))
        .catch(() => setHtmlContent("<p>Error al cargar texto</p>"));
    }
  }, [item]);

  return (
    <div style={{ border: "1px solid #ccc", padding: 15, marginBottom: 20 }}>
      {item.tipo === "img" && <img src={item.url} className="html-media" />}

      {item.tipo === "text" && (
        <div
          className="html-viewer"
          style={{
            width: "100%",
            border: "1px solid #ddd",
            padding: "15px",
            minHeight: "200px",
            overflow: "auto",
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}

      {item.tipo === "video" && <video src={item.url} controls className="html-media" />}

      {item.tipo === "audio" && <audio src={item.url} controls style={{ width: "100%" }} />}
    </div>
  );
}
