import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import useTheme from "../../../hooks/useTheme";
import "./NavBar.css";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <h1>Mi Sistema</h1>
        </Link>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/registro" className="nav-link">Registro</Link>
        <Link to="/Login" className="nav-link">Login</Link>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Cambiar tema"
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
