import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin";
import { useAuth } from "../../context/AuthContex";

function LoginPage() {
  const { email, password, error, loading, setEmail, setPassword, handleLogin } = useLogin();
  const { userRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirigir según rol
      switch (userRole) {
        case "admin":
          navigate("/admin");
          break;
        case "profesor":
          navigate("/profesor");
          break;
        case "est":
          navigate("/estudiante");
          break;
        case "edit":
          navigate("/editor");
          break;
        default:
          navigate("/");
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar sesión</h2>

        {error && <div className="mensaje mensaje-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="campo">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="Ejemplo: usuario@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="boton-login" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
