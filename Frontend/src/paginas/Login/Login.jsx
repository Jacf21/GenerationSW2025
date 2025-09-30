import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [valores, setValores] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar errores al escribir
    setErrores(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores({});
    setMensaje('');

    // Validar email
    if (!validarEmail(valores.email)) {
      setErrores(prev => ({
        ...prev,
        email: 'Ingrese un email válido'
      }));
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.message);
        return;
      }

      // Redirigir según rol
      switch (data.usuario.tipo) {
        case 'est':
          navigate('/panel-estudiante');
          break;
        case 'profesor':
          navigate('/panel-profesor');
          break;
        case 'admin':
          navigate('/panel-admin');
          break;
      }

    } catch (error) {
      setMensaje('Error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        
        {mensaje && (
          <div className="mensaje-error">
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="campo">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={valores.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className={errores.email ? 'input-error' : ''}
            />
            {errores.email && (
              <div className="mensaje-error-campo">{errores.email}</div>
            )}
          </div>

          <div className="campo">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={valores.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              className={errores.password ? 'input-error' : ''}
            />
            {errores.password && (
              <div className="mensaje-error-campo">{errores.password}</div>
            )}
          </div>

          <button type="submit" className="boton-primario">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;