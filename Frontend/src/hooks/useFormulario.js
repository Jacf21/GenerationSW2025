import { useState, useCallback } from 'react';

// Función para validar campos individualmente
const validarCampo = (nombre, valor) => {
  // Si no hay valor, devuelve mensaje genérico
  if (!valor) return `El ${nombre} es requerido`;

  switch (nombre) {
    case 'email':
      // Expresión regular para validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(valor)) 
        return 'El email no es válido, Debe ser un @gmail.com';
      break;
    case 'password':
      // Validar longitud mínima de contraseña
      if (valor.length < 8) 
        return 'La contraseña debe tener al menos 8 caracteres';
      break;
    case 'nombre':
      // Validar longitud mínima del nombre
      if (valor.length < 3) 
        return 'El nombre debe tener al menos 3 caracteres';
      break;
  }
  // Si pasa las validaciones, devuelve cadena vacía (sin error)
  return '';
};

// Hook personalizado para manejar formularios
export const useFormulario = (valoresIniciales = {}) => {
  // Estado para guardar valores de los inputs
  const [valores, setValores] = useState(valoresIniciales);
  // Estado para guardar errores por campo
  const [errores, setErrores] = useState({});
  // Estado para controlar si un campo fue "tocado" (usado)
  const [touched, setTouched] = useState({});

  // Función que valida un campo actual y actualiza errores
  const validarCampoActual = useCallback((name, value) => {
    const error = validarCampo(name, value); // valida según reglas
    setErrores(prev => ({
      ...prev,
      [name]: error
    }));
    return error; // devuelve el error si existe
  }, []);

  // Maneja cambios en inputs (onChange)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores(prev => ({
      ...prev,
      [name]: value
    }));
    // Si ya se tocó el campo, se valida en tiempo real
    if (touched[name]) {
      validarCampoActual(name, value);
    }
  };

  // Maneja cuando un input pierde el foco (onBlur)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validarCampoActual(name, value); // valida al salir del campo
  };

  // Permite navegar entre inputs con Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // evita enviar formulario con Enter
      const { name, value } = e.target;
      
      // Validar campo actual antes de pasar al siguiente
      const error = validarCampoActual(name, value);
      if (error) return;

      // Orden de inputs a recorrer
      const inputs = ['nombre', 'email', 'password', 'tipo'];
      const currentIndex = inputs.indexOf(name);
      const nextInput = document.querySelector(
        `input[name="${inputs[currentIndex + 1]}"], select[name="${inputs[currentIndex + 1]}"]`
      );
      
      // Si existe un siguiente input, enfocar, sino enfoca el botón submit
      if (nextInput) {
        nextInput.focus();
      } else {
        document.querySelector('button[type="submit"]').focus();
      }
    }
  };

  // Manejo del envío del formulario (onSubmit)
  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    const newErrors = {};
    Object.keys(valores).forEach(key => {
      const error = validarCampo(key, valores[key]);
      if (error) newErrors[key] = error;
    });

    // Si hay errores, no continúa
    if (Object.keys(newErrors).length > 0) {
      setErrores(newErrors);
      return;
    }

    // Si no hay errores, ejecuta el callback (ej: llamada a API)
    try {
      await callback(valores);
      setErrores({}); // limpia errores
    } catch (error) {
      setErrores({ submit: error.message }); // error general
    }
  };

  // Retorna funciones y estados para usar en el formulario
  return {
    valores,
    errores,
    handleChange,
    handleBlur,
    handleKeyDown,
    handleSubmit,
    setValores // También permite setear valores manualmente
  };
};
