import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <h1>Mi python </h1>
        </Link>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/registro" className="nav-link">Registro</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </div>
    </nav>
  );
};

export default NavBar;