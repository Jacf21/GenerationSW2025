import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(email, password);

      localStorage.setItem("token", res.token);
      localStorage.setItem("tipo", res.tipo);

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
