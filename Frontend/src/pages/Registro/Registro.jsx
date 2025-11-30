import { useFormulario } from "../../hooks/useFormulario";
import { useRegistro } from "../../hooks/useRegistro";
import Modal from "../../components/comunes/modal/modal";
import VerificacionModal from "../../components/VerificacionModal/VerificacionModal";
import { FaUserGraduate, FaChalkboardTeacher, FaUserCog } from "react-icons/fa";
import "./Registro.css";

const TipoUsuarioSelector = ({ onSelect }) => {
  const tipos = [
    {
      id: "est",
      nombre: "Estudiante",
      descripcion: "Para alumnos que tomarán cursos",
      icon: <FaUserGraduate className="tipo-icon" />,
    },
    {
      id: "profesor",
      nombre: "Profesor",
      descripcion: "Para docentes que impartirán clases (requiere aprobación)",
      icon: <FaChalkboardTeacher className="tipo-icon" />,
    },
    {
      id: "edit",
      nombre: "Editor",
      descripcion: "Para docentes con permisos de edición (requiere aprobación)",
      icon: <FaChalkboardTeacher className="tipo-icon" />,
    },
    {
      id: "admin",
      nombre: "Administrador",
      descripcion: "Para gestión del sistema",
      icon: <FaUserCog className="tipo-icon" />,
    },
  ];

  return (
    <div className="tipo-usuario-selector">
      <h2>Selecciona el tipo de usuario</h2>
      <div className="tipos-grid">
        {tipos.map((tipo) => (
          <button key={tipo.id} className="tipo-card" onClick={() => onSelect(tipo.id)}>
            {tipo.icon}
            <h3>{tipo.nombre}</h3>
            <p>{tipo.descripcion}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

const Registro = () => {
  const {
    showModal,
    setShowModal,
    showVerificacion,
    setShowVerificacion,
    mensaje,
    enviarRegistro,
    verificarCodigo,
    handleTipoSelect,
  } = useRegistro();

  const { valores, errores, handleChange, handleBlur, handleKeyDown, handleSubmit, setValores } =
    useFormulario({ nombre: "", email: "", password: "", confirmPassword: "", tipo: "" });

  return (
    <>
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <TipoUsuarioSelector onSelect={(tipo) => handleTipoSelect(tipo, setValores)} />
        </Modal>
      )}

      <div className="registro-container">
        <div className="registro-card">
          <h2>Crear Cuenta</h2>
          <div className="tipo-seleccionado">
            Registrándose como: <span>{getTipoLabel(valores.tipo)}</span>
          </div>

          {mensaje.texto && (
            <div className={`mensaje mensaje-${mensaje.tipo}`}>{mensaje.texto}</div>
          )}

          <form onSubmit={handleSubmit(enviarRegistro)} noValidate>
            <div className="campo">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={valores.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Ej: Juan Pérez"
                className={errores.nombre ? "input-error" : ""}
              />
              {errores.nombre && <div className="mensaje-error-campo">{errores.nombre}</div>}
            </div>

            <div className="campo">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={valores.email}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="correo@ejemplo.com"
                className={errores.email ? "input-error" : ""}
              />
              {errores.email && <div className="mensaje-error-campo">{errores.email}</div>}
            </div>

            <div className="campo">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={valores.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Mínimo 8 caracteres"
                className={errores.password ? "input-error" : ""}
              />
              {errores.password && <div className="mensaje-error-campo">{errores.password}</div>}
            </div>

            <div className="campo">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={valores.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Repite tu contraseña"
                className={errores.confirmPassword ? "input-error" : ""}
              />
              {errores.confirmPassword && (
                <div className="mensaje-error-campo">{errores.confirmPassword}</div>
              )}
            </div>

            <button type="submit" className="boton-primario">
              Crear cuenta
            </button>
          </form>
        </div>
      </div>

      <VerificacionModal
        isOpen={showVerificacion}
        onVerify={verificarCodigo}
        onClose={() => setShowVerificacion(false)}
      />
    </>
  );
};

const getTipoLabel = (tipo) => {
  const tipos = {
    est: "Estudiante",
    profesor: "Profesor",
    edit: "Editor",
    admin: "Administrador",
  };
  return tipos[tipo] || "";
};

export default Registro;
