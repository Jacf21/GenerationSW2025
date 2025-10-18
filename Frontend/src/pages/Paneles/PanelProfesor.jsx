import React from "react";
import "./Paneles.css";

const PanelProfesor = () => {
  return (
    <div className="panel-container">
      <h1>Panel del Profesor</h1>
      <div className="panel-content">
        <p>Bienvenido al panel de profesor</p>
        {/* Aquí irá el contenido específico del profesor */}
      </div>
    </div>
  );
};

export default PanelProfesor;
