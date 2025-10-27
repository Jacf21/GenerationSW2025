import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContex";
import { login as loginService } from "../services/authService";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      switch (user.tipo) {
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
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginService(email, password);

      login({
        id: res.id,
        nombre: res.nombre,
        tipo: res.tipo,
        token: res.token,
      });
      // Redirección según tipo de usuario
      if (res.tipo === "admin") navigate("/admin");
      else if (res.tipo === "profesor") navigate("/profesor");
      else if (res.tipo === "est") navigate("/estudiante");
      else if (res.tipo === "edit") navigate("/editor");
      else navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleLogin,
  };
};
