import './PanelAdmin.css';

const PanelAdmin = () => {
  return (
    <div className="panel-admin">
      <header className="panel-header">
        <h1>Panel de Administración</h1>
      </header>
      
      <div className="panel-content">
        <section className="estadisticas">
          <h2>Estadísticas Generales</h2>
          <div className="stats-grid">
            {/* Aquí irán las estadísticas */}
          </div>
        </section>

        <section className="gestion-usuarios">
          <h2>Gestión de Usuarios</h2>
          <div className="usuarios-lista">
            {/* Aquí irá la lista de usuarios */}
          </div>
        </section>

        <section className="gestion-cursos">
          <h2>Gestión de Cursos</h2>
          <div className="cursos-lista">
            {/* Aquí irá la lista de cursos */}
          </div>
        </section>
        <section className="gestion-cursos">
          <h2>Crear curso</h2>
          <div className="cursos-lista">
            {/* Aquí irá la lista de cursos */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PanelAdmin;