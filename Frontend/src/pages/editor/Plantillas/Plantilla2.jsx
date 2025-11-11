import React, { useState } from "react";
import "./Plantilla2.css";

export default function Plantilla2() {
  const [activeTab, setActiveTab] = useState("intro");
  const [output, setOutput] = useState(">>> Listo para ejecutar");
  const [code, setCode] = useState('print("Hola")');

  const themes = {
    intro: {
      title: "Introducción",
      desc: "Python es versátil y fácil de aprender",
      explanation: "Descubre por qué Python es uno de los lenguajes más populares del mundo.",
      code: 'print("Hola mundo")',
      exercise: "Escribe tu primer programa",
      progress: 1,
    },
    for: {
      title: "Bucle For",
      desc: "Itera sobre secuencias de forma elegante",
      explanation: "El bucle for es perfecto para repetir código múltiples veces.",
      code: "for i in range(5):\n    print(i)",
      exercise: "Imprime una tabla de multiplicar",
      progress: 2,
    },
    while: {
      title: "Bucle While",
      desc: "Repite mientras la condición sea verdadera",
      explanation: "Perfecto cuando no conoces el número exacto de iteraciones.",
      code: "i = 0\nwhile i < 5:\n    print(i)\n    i += 1",
      exercise: "Crea un juego de adivinanza",
      progress: 3,
    },
  };

  const handleRunCode = () => {
    setOutput(">>> Ejecutando código...\nSalida generada\n>>> Completado");
  };

  const currentTheme = themes[activeTab];

  return (
    <div className="plantilla2">
      <div className="p2-header">
        <div>
          <h2>Curso de Python</h2>
          <p className="p2-subtitle">Aprende programación desde cero</p>
        </div>
        <div className="p2-progress-widget">
          <div className="p2-progress-label">Progreso</div>
          <div className="p2-progress-circle">{currentTheme.progress}/10</div>
        </div>
      </div>

      <div className="p2-tabs">
        {Object.keys(themes).map((key) => (
          <button
            key={key}
            className={`p2-tab ${activeTab === key ? "active" : ""}`}
            onClick={() => {
              setActiveTab(key);
              setCode(themes[key].code);
            }}
          >
            {themes[key].title}
          </button>
        ))}
      </div>

      <div className="p2-container">
        {/* LADO IZQUIERDO: Contenido Principal */}
        <div className="p2-main">
          {/* Card de Descripción */}
          <div className="p2-card">
            <h3>{currentTheme.title}</h3>
            <p className="p2-card-desc">{currentTheme.desc}</p>
          </div>

          {/* Card de Explicación */}
          <div className="p2-card">
            <h4>¿Cómo funciona?</h4>
            <p>{currentTheme.explanation}</p>
          </div>

          {/* Card de Ejercicio */}
          <div className="p2-card p2-card-exercise">
            <h4>📝 Ejercicio Propuesto</h4>
            <p>{currentTheme.exercise}</p>
          </div>

          {/* Card de Galería */}
          <div className="p2-card">
            <h4>Recursos Visuales</h4>
            <div className="p2-gallery">
              <img src="https://picsum.photos/150/100?random=1" alt="img1" />
              <img src="https://picsum.photos/150/100?random=2" alt="img2" />
              <img src="https://picsum.photos/150/100?random=3" alt="img3" />
            </div>
          </div>

          {/* Card de Video */}
          <div className="p2-card">
            <h4>📺 Video Explicativo</h4>
            <video controls>
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
            </video>
          </div>

          {/* Card de Audio */}
          <div className="p2-card">
            <h4>🎵 Audio de Referencia</h4>
            <audio controls style={{ width: "100%" }}>
              <source src="https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3" />
            </audio>
          </div>
        </div>

        {/* LADO DERECHO: Editor y Salida */}
        <aside className="p2-sidebar">
          <div className="p2-editor-card">
            <label>Consola de Código</label>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} />
            <div className="p2-editor-buttons">
              <button className="p2-btn-primary" onClick={handleRunCode}>
                ▶ Ejecutar
              </button>
              <button className="p2-btn">↻ Reset</button>
            </div>
          </div>

          <div className="p2-output-card">
            <label>Salida</label>
            <div className="p2-output">{output}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
