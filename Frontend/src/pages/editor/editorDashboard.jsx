import React from "react";
import { FaPlusCircle, FaFileAlt, FaChartLine, FaUsers, FaBookOpen } from "react-icons/fa";
import "./editorDashboard.css";

const EditorDashboard = () => {
  return (
    <div className="editor-dashboard">
      <header className="dashboard-header">
        <h1>Dashboard, Editor</h1>
        <p>Desde aquí puedes gestionar contenido, revisar publicaciones y estadísticas.</p>
      </header>

      {/* Estadísticas */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <FaFileAlt className="stat-icon" />
          <div>
            <h2>24</h2>
            <p>Artículos publicados</p>
          </div>
        </div>
        <div className="stat-card">
          <FaBookOpen className="stat-icon" />
          <div>
            <h2>12</h2>
            <p>Borradores pendientes</p>
          </div>
        </div>
        <div className="stat-card">
          <FaChartLine className="stat-icon" />
          <div>
            <h2>3.2K</h2>
            <p>Visitas esta semana</p>
          </div>
        </div>
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <div>
            <h2>1.2K</h2>
            <p>Usuarios activos</p>
          </div>
        </div>
      </section>

      {/* Accesos rápidos */}
      <section className="dashboard-actions">
        <div className="action-card" onClick={() => alert("Crear nuevo artículo")}>
          <FaPlusCircle className="action-icon" />
          <span>Nuevo Artículo</span>
        </div>
        <div className="action-card" onClick={() => alert("Ver artículos")}>
          <FaFileAlt className="action-icon" />
          <span>Ver Artículos</span>
        </div>
        <div className="action-card" onClick={() => alert("Revisar borradores")}>
          <FaBookOpen className="action-icon" />
          <span>Borradores</span>
        </div>
        <div className="action-card" onClick={() => alert("Revisar estadísticas")}>
          <FaChartLine className="action-icon" />
          <span>Estadísticas</span>
        </div>
      </section>
    </div>
  );
};

export default EditorDashboard;
