import { useEffect, useState } from "react";
import "../../styles/htmlViewer.css";

export default function BloqueContenido({ item, borrar }) {
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
    <div style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={borrar}>Eliminar</button>
      </div>

      {item.tipo === "img" && <img src={item.url} className="html-media" />}

      {item.tipo === "text" && (
        <div
          className="html-viewer"
          style={{
            width: "600px",
            border: "1px solid #ccc",
            padding: "15px",
            minHeight: "200px",
            overflow: "auto",
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}

      {item.tipo === "video" && <video src={item.url} controls className="html-media" />}
      {item.tipo === "audio" && <audio src={item.url} controls />}
    </div>
  );
}
