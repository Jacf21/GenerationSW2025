import React from "react";
import { Link } from "react-router-dom";
import "./adminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <p>Bienvenido al panel de control del administrador</p>
      </header>

      <section className="admin-content">
        <div className="admin-card">
          <h2>Gestión de Usuarios</h2>
          <p>Administra y aprueba nuevos usuarios del sistema.</p>
          <Link to="/gestionar-usuarios" className="admin-btn">
            Ir a Gestión de Usuarios
          </Link>
        </div>

        <div className="admin-card">
          <h2>Gestión de Cursos</h2>
          <p>Revisa y gestiona los cursos registrados.</p>
          <Link to="/api/curso" className="admin-btn">
            Ver Cursos
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
