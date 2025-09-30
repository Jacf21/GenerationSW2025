import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const [valores, setValores] = useState({
    email: '',
    password: ''
  });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const validarCampos = (valores) => {
    const errores = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!valores.email) {
      errores.email = 'El email es requerido';
    } else if (!emailRegex.test(valores.email)) {
      errores.email = 'Email inválido';
    }

    if (!valores.password) {
      errores.password = 'La contraseña es requerida';
    }

    return errores;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar errores al escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = validarCampos(valores);
    
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
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
        throw new Error(data.message);
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
      setMensaje(error.message);
    }
  };

  return {
    valores,
    errores,
    mensaje,
    handleChange,
    handleSubmit
  };
};