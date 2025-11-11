import React, { useState } from "react";
import "./Plantilla3.css";

export default function Plantilla3() {
  const [activeExample, setActiveExample] = useState("for");
  const [output, setOutput] = useState(">>> Listo");
  const [code, setCode] = useState("for i in range(5):\n    print(i)");

  const examples = {
    for: {
      title: "For",
      desc: "Itera sobre secuencias",
      explanation: "El bucle for es ideal para recorrer listas, rangos y strings.",
      code: "for i in range(5):\n    print(i)",
      exercise: "Imprime los números pares del 1 al 20",
      progress: 1,
    },
    while: {
      title: "While",
      desc: "Repite condicionalmente",
      explanation: "Ejecuta el código mientras una condición sea verdadera.",
      code: "i = 0\nwhile i < 3:\n    i += 1\n    print(i)",
      exercise: "Crea un contador regresivo",
      progress: 2,
    },
    func: {
      title: "Funciones",
      desc: "Reutiliza código",
      explanation: "Las funciones agrupan código reutilizable con def.",
      code: "def suma(a, b):\n    return a + b\nprint(suma(5, 3))",
      exercise: "Crea una función que calcule el área de un círculo",
      progress: 3,
    },
  };

  const handleRunCode = () => {
    setOutput(">>> Ejecutando...\n1\n2\n3\n4\n>>> Completado");
  };

  const currentExample = examples[activeExample];

  return (
    <div className="plantilla3">
      <div className="p3-topbar">
        <div className="p3-title">Curso Python • Split View</div>
        <div className="p3-stats">
          <span>
            Tema: <strong>{currentExample.title}</strong>
          </span>
          <span className="p3-progress">Progreso: {currentExample.progress}/10</span>
        </div>
      </div>

      <div className="p3-container">
        {/* LADO IZQUIERDO: EDITOR GRANDE */}
        <div className="p3-left">
          <div className="p3-editor-section">
            <div className="p3-editor-header">
              <h3>Consola de Código</h3>
              <div className="p3-controls">
                <select
                  value={activeExample}
                  onChange={(e) => {
                    setActiveExample(e.target.value);
                    setCode(examples[e.target.value].code);
                  }}
                  className="p3-select"
                >
                  <option value="for">For</option>
                  <option value="while">While</option>
                  <option value="func">Funciones</option>
                </select>
                <button className="p3-btn-run" onClick={handleRunCode}>
                  ▶ Ejecutar
                </button>
                <button className="p3-btn-clear" onClick={() => setOutput("")}>
                  🗑 Limpiar
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="p3-textarea"
            />
          </div>

          {/* DESCRIPCIÓN Y EJERCICIO */}
          <div className="p3-info-section">
            <div className="p3-description-card">
              <h4>{currentExample.title}</h4>
              <p className="p3-desc">{currentExample.desc}</p>
            </div>
            <div className="p3-exercise-card">
              <h4>📝 Ejercicio</h4>
              <p>{currentExample.exercise}</p>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: RECURSOS */}
        <aside className="p3-right">
          {/* INFORMACIÓN */}
          <div className="p3-info-card">
            <h4>¿Cómo funciona?</h4>
            <p>{currentExample.explanation}</p>
          </div>

          {/* IMAGEN */}
          <div className="p3-resource-card">
            <h4>📸 Imagen</h4>
            <img
              src="https://picsum.photos/300/150?random=1"
              alt="recurso"
              className="p3-resource-img"
            />
          </div>

          {/* VIDEO */}
          <div className="p3-resource-card">
            <h4>📺 Video</h4>
            <video controls className="p3-video">
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
            </video>
          </div>

          {/* AUDIO */}
          <div className="p3-resource-card">
            <h4>🎵 Audio</h4>
            <audio controls style={{ width: "100%" }}>
              <source src="https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3" />
            </audio>
          </div>

          {/* NOTAS */}
          <div className="p3-notes-card">
            <h4>📓 Notas</h4>
            <div className="p3-notes" contentEditable>
              Escribe tus notas aquí...
            </div>
          </div>

          {/* SALIDA */}
          <div className="p3-output-card">
            <h4>📤 Salida</h4>
            <div className="p3-output">{output}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
