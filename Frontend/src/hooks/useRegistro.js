import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/userService";

export const useRegistro = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(true);
  const [showVerificacion, setShowVerificacion] = useState(false);
  const [emailVerificar, setEmailVerificar] = useState("");
  const [datosPendientes, setDatosPendientes] = useState({});
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  // Manejar tipo de usuario seleccionado
  const handleTipoSelect = (tipo, setValores) => {
    setValores((prev) => ({ ...prev, tipo }));
    setShowModal(false);
  };

  // Envío del formulario de registro
  const enviarRegistro = async (datos) => {
    if (datos.password !== datos.confirmPassword) {
      setMensaje({ tipo: "error", texto: "Las contraseñas no coinciden" });
      return;
    }
    try {
      const datosEnvio = { ...datos };
      delete datosEnvio.confirmPassword;
      const res = await api.registro(datosEnvio); // el backend genera código y envía correo
      setEmailVerificar(res.email);
      setDatosPendientes(datosEnvio);
      setShowVerificacion(true);
      setMensaje({ tipo: "info", texto: "Te enviamos un código a tu correo" });
    } catch (error) {
      setMensaje({ tipo: "error", texto: error.message });
    }
  };

  // Verificación del código
  const verificarCodigo = async (codigo) => {
    try {
      const datos = { ...datosPendientes, codigo, email: emailVerificar };
      const res = await api.verificarCodigo(datos);
      setShowVerificacion(false);
      setMensaje({ tipo: "exito", texto: "¡Cuenta creada y verificada!" });
      setTimeout(() => navigate("/login"), 2000);
      return res;
    } catch (error) {
      setMensaje({ tipo: "error", texto: error.message });
    }
  };

  return {
    showModal,
    setShowModal,
    showVerificacion,
    setShowVerificacion,
    emailVerificar,
    mensaje,
    setMensaje,
    enviarRegistro,
    verificarCodigo,
    handleTipoSelect,
  };
};
