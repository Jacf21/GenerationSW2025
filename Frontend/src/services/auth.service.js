import apiRequest from "./apiCliente";

export const authService = {
  async login(credentials) {
    try {
      console.log("Intentando login con:", credentials);

      const response = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      console.log("Respuesta del servidor:", response);

      if (!response) {
        throw new Error("No se recibió respuesta del servidor");
      }

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        return response;
      } else {
        throw new Error("Token no recibido");
      }
    } catch (error) {
      console.error("Error en login:", error);
      throw new Error(error.message || "Error al iniciar sesión");
    }
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      return null;
    }
  },
};
