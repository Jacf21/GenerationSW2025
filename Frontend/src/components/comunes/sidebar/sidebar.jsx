import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContex";
import {
  FaHome,
  FaUserPlus,
  FaSignInAlt,
  FaUsers,
  FaChartBar,
  FaChalkboardTeacher,
  FaBook,
  FaCog,
  FaEdit,
  FaUserCircle,
} from "react-icons/fa";
import "./sidebar.css";

const Sidebar = () => {
  const { isAuthenticated, userRole } = useAuth();

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
          { to: "/perfil", label: "Mi Perfil", icon: <FaUserCircle /> },
          { to: "/configuracion", label: "Configuración", icon: <FaCog /> },
        ];
      case "edit":
        return [
          { to: "/editor", label: "Panel de Edición" },
          { to: "/topico", label: "Gestionar Topicos" },
          { to: "/perfil", label: "Mi Perfil" },
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
          {menuItems.map((item) => (
            <li key={item.to} className="tooltip-container">
              <Link to={item.to} className="sidebar-icon">
                {item.icon}
                <span className="tooltip-text">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
