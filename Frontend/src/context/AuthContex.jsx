import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Recuperar sesión si existe
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user;
  const userRole = user?.tipo || null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
