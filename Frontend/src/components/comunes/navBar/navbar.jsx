import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContex";
import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../../../hooks/useTheme";
import "./navbar.css";
import icono from "../../../assets/python1.png";

function NavBar() {
  const { user, logout, isAuthenticated, userRole } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const renderLinksByRole = () => {
    switch (userRole) {
      case "admin":
        return (
          <>
            <Link to="/admin">
              <img src={icono} alt="Admin Panel" className="admin-icon" />
              <span>Python tutorial</span>
            </Link>
          </>
        );
      case "profesor":
        return (
          <>
            <Link to="/profesor">
              <img src={icono} alt="Admin Panel" className="admin-icon" />
              <span>Python tutorial</span>
            </Link>
          </>
        );
      case "est":
        return (
          <>
            <Link to="/estudiante">
              <img src={icono} alt="Admin Panel" className="admin-icon" />
              <span>Python tutorial</span>
            </Link>
          </>
        );
      case "edit":
        return (
          <>
            <Link to="/editor">
              <img src={icono} alt="Admin Panel" className="admin-icon" />
              <span>Python tutorial</span>
            </Link>
          </>
        );
      default:
        return (
          <>
            <Link to="/">
              <img src={icono} alt="Admin Panel" className="admin-icon" />
              <span>Python tutorial</span>
            </Link>
          </>
        );
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">{renderLinksByRole()}</div>

      <div className="nav-right">
        {!isAuthenticated ? (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/registro">Registrarse</Link>
          </>
        ) : (
          <>
            <span className="nav-usuario">{user?.nombre ? `Hola, ${user.nombre}` : "Usuario"}</span>
            <button onClick={logout} className="nav-btn-cerrar">
              Cerrar sesión
            </button>
          </>
        )}

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
