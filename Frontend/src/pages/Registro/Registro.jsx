// Importamos hooks de React
import { useState } from "react";
// Hook de react-router-dom para navegar entre páginas
import { useNavigate } from "react-router-dom";
// Custom hook para manejar formularios y validaciones
import { useFormulario } from "../../hooks/useFormulario";
// Servicio API para hacer peticiones al backend
import { api } from "../../services/api";
// Componente modal reutilizable
import Modal from "../../components/comunes/Modal/modal";
// Componente para verificación de cuenta
import VerificacionModal from "../../components/VerificacionModal/VerificacionModal";
// Iconos de react-icons
import { FaUserGraduate, FaChalkboardTeacher, FaUserCog } from "react-icons/fa";
// Estilos CSS del componente
import "./Registro.css";

// Selector de tipo de usuario dentro del modal
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
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [showVerificacion, setShowVerificacion] = useState(false);
  const [emailVerificar, setEmailVerificar] = useState("");
  const [datosPendientes, setDatosPendientes] = useState({});
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const { valores, errores, handleChange, handleBlur, handleKeyDown, handleSubmit, setValores } =
    useFormulario({
      nombre: "",
      email: "",
      password: "",
      confirmPassword: "",
      tipo: "",
    });

  const handleTipoSelect = (tipo) => {
    setValores((prev) => ({ ...prev, tipo }));
    setShowModal(false);
  };

  const onSubmit = async (datos) => {
    if (datos.password !== datos.confirmPassword) {
      setMensaje({ tipo: "error", texto: "Las contraseñas no coinciden" });
      return;
    }
    try {
      const { confirmPassword, ...datosEnvio } = datos;
      const res = await api.registro(datosEnvio);
      setEmailVerificar(res.email);
      setDatosPendientes(datosEnvio);
      setShowVerificacion(true);
      setMensaje({ tipo: "info", texto: "Te enviamos un código a tu correo" });
    } catch (error) {
      setMensaje({ tipo: "error", texto: error.message });
    }
  };

  const handleVerificar = async (codigo) => {
    const datos = { ...datosPendientes, codigo, email: emailVerificar };
    const res = await api.verificarCodigo(datos);
    setShowVerificacion(false);
    setMensaje({ tipo: "exito", texto: "¡Cuenta creada y verificada!" });
    setTimeout(() => navigate("/login"), 2000);
    return res; // Devuelve el mensaje de éxito al modal
  };

  return (
    <>
      {showModal && (
        <Modal isOpen={showModal} onClose={() => navigate("/")}>
          <TipoUsuarioSelector onSelect={handleTipoSelect} />
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

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="campo">
              <label htmlFor="nombre">Nombre completo</label>
              <div className="input-container">
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
                  autoFocus
                />
                {errores.nombre && <div className="mensaje-error-campo">{errores.nombre}</div>}
              </div>
            </div>

            <div className="campo">
              <label htmlFor="email">Email</label>
              <div className="input-container">
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
            </div>

            <div className="campo">
              <label htmlFor="password">Contraseña</label>
              <div className="input-container">
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
            </div>

            {/* Nuevo Campo Confirmar Contraseña */}
            <div className="campo">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <div className="input-container">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={valores.confirmPassword}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    // Validación adicional al perder el foco
                    if (valores.password !== e.target.value) {
                      setMensaje({
                        tipo: "error",
                        texto: "Las contraseñas no coinciden",
                      });
                    } else {
                      setMensaje({ tipo: "", texto: "" });
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Repite tu contraseña"
                  className={errores.confirmPassword ? "input-error" : ""}
                />
                {errores.confirmPassword && (
                  <div className="mensaje-error-campo">{errores.confirmPassword}</div>
                )}
              </div>
            </div>

            {/* Errores generales (ej. backend) */}
            {errores.submit && <div className="mensaje mensaje-error">{errores.submit}</div>}

            <button type="submit" className="boton-primario">
              Crear cuenta
            </button>
          </form>
        </div>
      </div>
      <VerificacionModal
        isOpen={showVerificacion}
        onVerify={handleVerificar}
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
