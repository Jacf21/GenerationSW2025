import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function NavBar() {
  const { user, logout, isAuthenticated, userRole } = useAuth();

  const renderLinksByRole = () => {
    switch (userRole) {
      case "admin":
        return (
          <>
            <Link to="/admin">Panel Admin</Link>
            <Link to="/gestionar-usuarios">Usuarios</Link>
          </>
        );
      case "profesor":
        return (
          <>
            <Link to="/profesor">Mis Cursos</Link>
            <Link to="/crear-curso">Crear Curso</Link>
          </>
        );
      case "est":
        return <Link to="/estudiante">Mis Clases</Link>;
      case "edit":
        return <Link to="/editor">Editor</Link>;
      default:
        return <Link to="/">Inicio</Link>;
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        {isAuthenticated ? renderLinksByRole() : <Link to="/">Inicio</Link>}
      </div>

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
      </div>
    </nav>
  );
}

export default NavBar;
