import './PanelProfesor.css';

const PanelProfesor = () => {
  return (
    <div className="panel-profesor">
      <header className="panel-header">
        <h1>Panel de Profesor</h1>
      </header>
      
      <div className="panel-content">
        <section className="cursos-activos">
          <h2>Cursos Activos</h2>
          <div className="cursos-grid">
            {/* Aquí irán los cursos */}
          </div>
        </section>

        <section className="tareas-pendientes">
          <h2>Tareas por Revisar</h2>
          <div className="tareas-lista">
            {/* Aquí irán las tareas */}
          </div>
        </section>
                <section className="tareas-pendientes">
          <h2>Crear nuevo curso</h2>
          <div className="tareas-lista">
            {/* Aquí irán las tareas */}
            <a href="http://localhost:5173/crear-curso ">
            <button className="boton"> Crear curso</button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PanelProfesor;