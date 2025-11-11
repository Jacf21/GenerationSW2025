import React, { useState } from "react";
import "./Plantilla1.css";

export default function Plantilla1() {
  const [activeSection, setActiveSection] = useState("intro");
  const [output, setOutput] = useState(">>> Listo para ejecutar código");
  const [code, setCode] = useState('print("Hola mundo")');

  const sections = {
    intro: {
      title: "Introducción",
      desc: "Python es un lenguaje de programación interpretado, dinámico y muy versátil. Se utiliza en ciencia de datos, web, automatización y más.",
      explanation:
        "Aprenderás los conceptos básicos de Python, cómo escribir tu primer programa y entender la estructura fundamental del lenguaje.",
      code: 'print("Hola mundo")',
      exercise: "Modifica el mensaje dentro de print()",
      progress: 1,
    },
    for: {
      title: "Bucle For",
      desc: "El bucle for itera sobre secuencias (listas, strings, rangos). Es perfecto para repetir código un número de veces.",
      explanation:
        "for itera sobre cada elemento de una secuencia. Sintaxis: for variable in secuencia:",
      code: "for i in range(5):\n    print(f'Número: {i}')",
      exercise: "Imprime los números del 1 al 10",
      progress: 2,
    },
    while: {
      title: "Bucle While",
      desc: "El bucle while repite código mientras una condición sea verdadera. Úsalo cuando no sepas cuántas iteraciones necesitas.",
      explanation:
        "while verifica una condición antes de cada iteración. Si es falsa, el bucle detiene.",
      code: "i = 0\nwhile i < 5:\n    print(i)\n    i += 1",
      exercise: "Crea un contador que vaya del 10 al 1",
      progress: 3,
    },
  };

  const handleRunCode = () => {
    setOutput(">>> Ejecutando...\nHola mundo\n>>> Completado exitosamente");
  };

  const currentSection = sections[activeSection];

  return (
    <div className="plantilla1">
      {/* SIDEBAR */}
      <div className="p1-sidebar">
        <div className="p1-brand">📚 Python Básico</div>
        <nav className="p1-nav">
          {Object.keys(sections).map((key) => (
            <button
              key={key}
              className={`p1-nav-btn ${activeSection === key ? "active" : ""}`}
              onClick={() => {
                setActiveSection(key);
                setCode(sections[key].code);
              }}
            >
              {sections[key].title}
            </button>
          ))}
        </nav>
        <div className="p1-progress-bar">
          <div className="p1-progress-label">Progreso del Curso</div>
          <div className="p1-progress-fill">
            <div
              className="p1-progress-amount"
              style={{ width: `${(currentSection.progress / 10) * 100}%` }}
            ></div>
          </div>
          <div className="p1-progress-text">{currentSection.progress}/10</div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="p1-content">
        {/* HEADER */}
        <div className="p1-header">
          <div>
            <h1>{currentSection.title}</h1>
            <p className="p1-description">{currentSection.desc}</p>
          </div>
          <span className="p1-level">Nivel: Básico</span>
        </div>

        {/* EXPLICACIÓN */}
        <div className="p1-explanation-box">
          <h3>¿Cómo funciona?</h3>
          <p>{currentSection.explanation}</p>
        </div>

        {/* MEDIA: IMAGEN, VIDEO, AUDIO */}
        <div className="p1-media-section">
          <div className="p1-media-item">
            <h4>Imagen Referencial</h4>
            <img src="https://picsum.photos/250/150?random=1" alt="ejemplo" />
          </div>
          <div className="p1-media-item">
            <h4>Video Explicativo</h4>
            <video controls>
              <source
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="p1-media-item">
            <h4>Audio de Referencia</h4>
            <audio controls>
              <source
                src="https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3"
                type="audio/mpeg"
              />
            </audio>
          </div>
        </div>

        {/* EJERCICIO Y EDITOR */}
        <div className="p1-exercise-box">
          <h3>Ejercicio Práctico</h3>
          <p>{currentSection.exercise}</p>
        </div>

        {/* EDITOR Y CONSOLA */}
        <div className="p1-editor-section">
          <div className="p1-code-panel">
            <label>Consola de Código</label>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} />
            <div className="p1-buttons">
              <button className="btn-primary" onClick={handleRunCode}>
                ▶ Ejecutar
              </button>
              <button className="btn-secondary" onClick={() => setCode(currentSection.code)}>
                ↻ Resetear
              </button>
              <button className="btn-secondary" onClick={() => setOutput("")}>
                🗑 Limpiar Salida
              </button>
            </div>
          </div>

          <div className="p1-output-panel">
            <label>Salida de Código</label>
            <div className="p1-console">{output}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
