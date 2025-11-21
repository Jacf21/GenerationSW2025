

import { Link } from "react-router-dom";
import "./Inicio.css";

const IconoPortal = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="neon-glow"
  >
    <path d="M12 19V5" />
    <path d="M5 12H19" />
    <path d="M5 5l7 7 7-7" />
    <path d="M5 19l7-7 7 7" />
  </svg>
);

const Inicio = () => {
  return (
    <div className="page-container-dark">
      <div className="inicio-gateway">
        <div className="icono-portal">
          <IconoPortal />
        </div>
        <div className="inicio-content-dark">
          <h1 className="title-animated">
            Acceso al <span className="highlight-text">Tutorial de Python</span>
          </h1>
          <p className="subtitle-tech">
            El portal seguro a tu sistema de gestión avanzado para ver tus topicos.
          </p>
          <div className="inicio-description-tech">
            <p>
              **version v1.0** ofrece una infraestructura robusta para el
              aprendizaje y calificacion en tiempo real en los topicos a registrarse.
              Asegura tu identidad para ingresar a la plataforma y desbloquear
              todo el potencial analítico.
            </p>
          </div>
          <div className="inicio-botones-tech">
            <Link to="/login" className="tech-button tech-login">
              <span className="button-label">🔐 Iniciar Sesión</span>
            </Link>
            <Link to="/registro" className="tech-button tech-registro">
              <span className="button-label">➕ Registrarse</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-blur-effect top-left"></div>
      <div className="bg-blur-effect bottom-right"></div>
    </div>
  );
};

export default Inicio;