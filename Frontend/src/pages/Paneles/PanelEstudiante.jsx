import React from "react";
import "./Paneles.css";

const PanelEstudiante = () => {
  return (
    <div className="panel-container">
      <h1>Panel del Estudiante</h1>
      <div className="panel-content">
        <p>Bienvenido al panel de estudiante</p>
        {/* Aquí irá el contenido específico del estudiante */}
      </div>
    </div>
  );
};

export default PanelEstudiante;
