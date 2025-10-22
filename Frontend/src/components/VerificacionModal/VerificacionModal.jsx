import { useState, useEffect } from "react";
import "./VerificacionModal.css";

const VerificacionModal = ({ isOpen, onVerify, onClose }) => {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (!isOpen) return;
    setCodigo("");
    setError("");
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
    if (codigo.length !== 6) {
      setError("El código debe tener 6 dígitos");
      return;
    }
    try {
      await onVerify(codigo);
    } catch (err) {
      setError(err.message);
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
          />
          <div className="timer">Tiempo restante: {formatTime(timeLeft)}</div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="verify-button" disabled={codigo.length !== 6 || timeLeft === 0}>
            Verificar
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificacionModal;