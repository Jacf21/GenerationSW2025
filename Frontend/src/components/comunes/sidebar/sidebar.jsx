import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Menú</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/perfil">Mi Perfil</Link>
          </li>
          <li>
            <Link to="/configuracion">Configuración</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;