import { Link } from "react-router-dom";
import "./inicio.css";

const Inicio = () => {
  return (
    <div className="page-container">
      <div className="inicio-container">
        <div className="inicio-content">
          <h1>Bienvenido al Sistema</h1>
          <p>Por favor, inicia sesión o regístrate para continuar.</p>
          <div className="inicio-botones">
            <Link to="/registro" className="boton boton-registro">
              Registrarse
            </Link>
            <Link to="/login" className="boton boton-login">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
