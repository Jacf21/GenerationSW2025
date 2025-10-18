import React from "react";
import "./Paneles.css";

const PanelAdmin = () => {
  return (
    <div className="panel-container">
      <h1>Panel de Administrador</h1>
      <div className="panel-content">
        <p>Bienvenido al panel de administrador</p>
        {/* Aquí irá el contenido específico del administrador */}
      </div>
    </div>
  );
};

export default PanelAdmin;
