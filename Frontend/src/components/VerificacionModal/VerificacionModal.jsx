import { useState, useEffect } from "react";
import "./VerificacionModal.css";

const VerificacionModal = ({ isOpen, onVerify, onClose }) => {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Nuevo estado para éxito
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (!isOpen) return;
    setCodigo("");
    setError("");
    setSuccess("");
    setTimeLeft(300);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setError("El código expiró. Por favor, regístrate nuevamente.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (codigo.length !== 6) {
      setError("El código debe tener 6 dígitos");
      return;
    }
    try {
      const res = await onVerify(codigo);
      setSuccess(res.message);
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="verificacion-overlay">
      <div className="verificacion-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Verifica tu cuenta</h2>
        <p>Introduce el código enviado a tu correo.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="6"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            style={{ fontSize: "2rem", textAlign: "center", letterSpacing: "0.5em" }}
            disabled={!!success}
          />
          <div className="timer">Tiempo restante: {formatTime(timeLeft)}</div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button
            type="submit"
            className="verify-button"
            disabled={codigo.length !== 6 || timeLeft === 0 || !!success}
          >
            Verificar
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificacionModal;
