import "./Login.css";
import { useLogin } from "../../hooks/useLogin";

function LoginPage() {
  const { email, password, error, loading, setEmail, setPassword, handleLogin } = useLogin();

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
