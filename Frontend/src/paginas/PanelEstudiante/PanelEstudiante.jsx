import './PanelEstudiante.css';

const PanelEstudiante = () => {
  return (
    <div className="panel-estudiante">
      <header className="panel-header">
        <h1>Panel de Estudiante</h1>
      </header>
      
      <div className="panel-content">
        <section className="mis-cursos">
          <h2>Mis Cursos</h2>
          <div className="cursos-grid">
            {/* Aquí irán los cursos */}
          </div>
        </section>

        <section className="proximas-tareas">
          <h2>Próximas Tareas</h2>
          <div className="tareas-lista">
            {/* Aquí irán las tareas */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PanelEstudiante;