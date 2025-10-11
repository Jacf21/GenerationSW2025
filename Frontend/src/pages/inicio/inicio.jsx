import { Link } from 'react-router-dom';
import './Inicio.css';

const Inicio = () => {
  return (
    <div className="inicio">
      <h1>Bienvenido al Sistema</h1>
      <p>Por favor, inicia sesión o regístrate para continuar.</p>
      <div className="inicio-botones">
        <Link to="/registro" className="boton boton-registro">
          Registrarse
        </Link>
        {/* <Link to="/login" className="boton boton-login">
          Iniciar Sesión
        </Link> */}
      </div>
    </div>
  );
};

export default Inicio;