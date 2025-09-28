// Importamos hooks de React
import { useState } from 'react';
// Hook de react-router-dom para navegar entre páginas
import { useNavigate } from 'react-router-dom';
// Custom hook para manejar formularios y validaciones
import { useFormulario } from '../../hooks/useFormulario';
// Servicio API para hacer peticiones al backend
import { registroUsuario } from '../../servicios/authService';
// Componente modal reutilizable
import Modal from '../../componentes/comunes/Modal/Modal';
// Iconos de react-icons
import { FaUserGraduate, FaChalkboardTeacher, FaUserCog } from 'react-icons/fa';
// Estilos CSS del componente
import './Registro.css';

// Selector de tipo de usuario dentro del modal
const TipoUsuarioSelector = ({ onSelect }) => {
  // Definimos los tipos de usuario con id, nombre, descripción e ícono
  const tipos = [
    { 
      id: 'est', 
      nombre: 'Estudiante', 
      descripcion: 'Para alumnos que tomarán cursos',
      icon: <FaUserGraduate className="tipo-icon" />
    },
    { 
      id: 'profesor', 
      nombre: 'Profesor', 
      descripcion: 'Para docentes que impartirán clases',
      icon: <FaChalkboardTeacher className="tipo-icon" />
    },
    { 
      id: 'admin', 
      nombre: 'Administrador', 
      descripcion: 'Para gestión del sistema',
      icon: <FaUserCog className="tipo-icon" />
    }
  ];

  // Renderizamos el modal con opciones de tipo de usuario
  return (
    <div className="tipo-usuario-selector">
      <h2>Selecciona el tipo de usuario</h2>
      <div className="tipos-grid">
        {tipos.map(tipo => (
          <button
            key={tipo.id} // clave única para React
            className="tipo-card"
            onClick={() => onSelect(tipo.id)} // al hacer clic, seleccionamos ese tipo
          >
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
  const navigate = useNavigate(); // Hook para redirigir después de registro
  const [showModal, setShowModal] = useState(true); // Estado para mostrar/ocultar modal
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' }); // Estado para mensajes de éxito o error

  // Usamos el hook personalizado para manejar el formulario
  const { 
    valores, 
    errores, 
    handleChange, 
    handleBlur,
    handleKeyDown, 
    handleSubmit,
    setValores 
  } = useFormulario({
    nombre: '',
    email: '',
    password: '',
    tipo: ''
  });

  // Cuando se selecciona un tipo de usuario en el modal
  const handleTipoSelect = (tipo) => {
    setValores(prev => ({
      ...prev,
      tipo
    }));
    setShowModal(false); // cerramos el modal
  };

  // Función que maneja el envío del formulario
  const onSubmit = async (datos) => {
    try {
      await registroUsuario(datos); // llamada al backend
      setMensaje({ 
        tipo: 'exito', 
        texto: 'Registro exitoso! Redirigiendo...' 
      });
      // Redirigimos al login después de 2 segundos
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      // Capturamos error y mostramos mensaje
      setMensaje({ 
        tipo: 'error', 
        texto: error.message || 'Error al registrar usuario' 
      });
    }
  };

  // Si el modal está abierto, mostramos el selector de tipo de usuario
  if (showModal) {
    return (
      <Modal isOpen={showModal} onClose={() => navigate('/')}>
        <TipoUsuarioSelector onSelect={handleTipoSelect} />
      </Modal>
    );
  }

  // Render principal del formulario de registro
  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2>Crear Cuenta</h2>

        {/* Mostrar el tipo de usuario seleccionado */}
        <div className="tipo-seleccionado">
          Registrándose como: <span>{getTipoLabel(valores.tipo)}</span>
        </div>

        {/* Mensaje de éxito o error */}
        {mensaje.texto && (
          <div className={`mensaje mensaje-${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          
          {/* Campo Nombre */}
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
                className={errores.nombre ? 'input-error' : ''}
                autoFocus
              />
              {/* Mostrar error de validación */}
              {errores.nombre && (
                <div className="mensaje-error-campo">{errores.nombre}</div>
              )}
            </div>
          </div>

          {/* Campo Email */}
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
                className={errores.email ? 'input-error' : ''}
              />
              {errores.email && (
                <div className="mensaje-error-campo">{errores.email}</div>
              )}
            </div>
          </div>

          {/* Campo Contraseña */}
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
                className={errores.password ? 'input-error' : ''}
              />
              {errores.password && (
                <div className="mensaje-error-campo">{errores.password}</div>
              )}
            </div>
          </div>

          {/* Errores generales (ej. backend) */}
          {errores.submit && (
            <div className="mensaje mensaje-error">
              {errores.submit}
            </div>
          )}

          {/* Botón submit */}
          <button type="submit" className="boton-primario">
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

// Función auxiliar para mostrar etiqueta legible del tipo de usuario
const getTipoLabel = (tipo) => {
  const tipos = {
    est: 'Estudiante',
    profesor: 'Profesor',
    admin: 'Administrador'
  };
  return tipos[tipo] || '';
};

export default Registro;
