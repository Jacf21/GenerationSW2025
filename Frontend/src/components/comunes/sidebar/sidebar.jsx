import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContex";
import {
  FaHome,
  FaPlusCircle,
  FaTasks,
  FaLayerGroup,
  FaUserPlus,
  FaSignInAlt,
  FaUsers,
  FaChartBar,
  FaChalkboardTeacher,
  FaBook,
  FaCog,
  FaEdit,
  FaUserCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import "./sidebar.css";

const Sidebar = () => {
  const { isAuthenticated, userRole } = useAuth();
  const [expandPlantillas, setExpandPlantillas] = useState(false);
  const location = useLocation();

  // Cierra el panel si cambias de ruta
  useEffect(() => {
    setExpandPlantillas(false);
  }, [location.pathname]);

  const plantillas = [
    { id: 1, nombre: "Plantilla 1", to: "/plantillas/1" },
    { id: 2, nombre: "Plantilla 2", to: "/plantillas/2" },
    { id: 3, nombre: "Plantilla 3", to: "/plantillas/3" },
  ];

  const getMenuByRole = () => {
    if (!isAuthenticated) {
      return [
        { to: "/", label: "Inicio", icon: <FaHome /> },
        { to: "/login", label: "Iniciar sesión", icon: <FaSignInAlt /> },
        { to: "/registro", label: "Registrarse", icon: <FaUserPlus /> },
      ];
    }

    switch (userRole) {
      case "admin":
        return [
          { to: "/admin", label: "Panel Admin", icon: <FaHome /> },
          { to: "/gestionar-usuarios", label: "Gestionar Usuarios", icon: <FaUsers /> },
          { to: "/reportes", label: "Reportes", icon: <FaChartBar /> },
        ];
      case "profesor":
        return [
          { to: "/mis-cursos", label: "Mis Cursos", icon: <FaChalkboardTeacher /> },
          { to: "/crear-curso", label: "Crear Curso", icon: <FaEdit /> },
          { to: "/perfil", label: "Mi Perfil", icon: <FaUserCircle /> },
        ];
      case "est":
        return [
          { to: "/estudiante", label: "Mis Clases", icon: <FaBook /> },
          { to: "/matriculacion", label: "Matriculación", icon: <FaPlusCircle /> },
          { to: "/perfil", label: "Mi Perfil", icon: <FaUserCircle /> },
          { to: "/configuracion", label: "Configuración", icon: <FaCog /> },
        ];
      case "edit":
        return [
          { to: "/editor", label: "Dashboard Editor", icon: <FaHome /> },
          // { to: "/crear-topico", label: "Crear Tópico", icon: <FaPlusCircle /> },
          { to: "/lista-topicos", label: "Gestión de Tópicos", icon: <FaTasks /> },
          { to: "/contenidos", label: "Gestión de Contenidos", icon: <FaLayerGroup /> },
        ];
      default:
        return [{ to: "/", label: "Inicio", icon: <FaHome /> }];
    }
  };

  const menuItems = getMenuByRole();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, idx) => (
            <li key={`${item.to}-${item.label}-${idx}`} className="tooltip-container">
              <Link to={item.to} className="sidebar-icon">
                {item.icon}
                <span className="tooltip-text">{item.label}</span>
              </Link>
            </li>
          ))}

          {/* Icono Plantillas (igual al resto) */}
          <li className="tooltip-container plantillas-section" aria-haspopup="true">
            <button
              className={`sidebar-icon plantillas-icon-btn ${expandPlantillas ? "active" : ""}`}
              onClick={() => setExpandPlantillas((s) => !s)}
              aria-expanded={expandPlantillas}
              title="Plantillas"
            >
              <FaBook />
              <span className="tooltip-text">Plantillas</span>
            </button>

            {/* Panel lateral a la derecha del sidebar */}
            {expandPlantillas && (
              <div className="plantillas-panel" role="menu">
                <div className="plantillas-panel-header">
                  <strong>Plantillas</strong>
                  <button
                    className="panel-close-btn"
                    onClick={() => setExpandPlantillas(false)}
                    aria-label="Cerrar"
                  >
                    <FaChevronUp />
                  </button>
                </div>
                <ul className="plantillas-list">
                  {plantillas.map((p) => (
                    <li key={p.id}>
                      <Link to={p.to} className="plantilla-link">
                        {p.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
