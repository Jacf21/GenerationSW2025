import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContex";
import "./sidebar.css";

const Sidebar = () => {
  const { isAuthenticated, userRole } = useAuth();

  // Links según rol o estado
  const getMenuByRole = () => {
    if (!isAuthenticated) {
      return [
        { to: "/", label: "Inicio" },
        { to: "/login", label: "Iniciar sesión" },
        { to: "/registro", label: "Registrarse" },
      ];
    }

    switch (userRole) {
      case "admin":
        return [
          { to: "/admin", label: "Panel Admin" },
          { to: "/gestionar-usuarios", label: "Gestionar Usuarios" },
          { to: "/reportes", label: "Reportes" },
        ];
      case "profesor":
        return [
          { to: "/mis-cursos", label: "Mis Cursos" },
          { to: "/crear-curso", label: "Crear Curso" },
          { to: "/perfil", label: "Mi Perfil" },
        ];
      case "est":
        return [
          { to: "/estudiante", label: "Mis Clases" },
          { to: "/perfil", label: "Mi Perfil" },
          { to: "/configuracion", label: "Configuración" },
        ];
      case "edit":
        return [
          { to: "/editor", label: "Panel de Edición" },
          { to: "/topico", label: "Gestionar Topicos" },
          { to: "/perfil", label: "Mi Perfil" },
        ];
      default:
        return [
          { to: "/", label: "Inicio" }, // Fallback por si hay error
        ];
    }
  };

  const menuItems = getMenuByRole();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Menú</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
