import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContex";

/**
 * Protege rutas según autenticación y rol permitido
 * @param {Array} allowedRoles - Lista de roles que pueden acceder (opcional)
 */
function PrivateRoute({ allowedRoles }) {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(userRole)) return <Navigate to="/" />;

  // Outlet permite renderizar rutas hijas (nested routes)
  return <Outlet />;
}

export default PrivateRoute;
