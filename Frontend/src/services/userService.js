import apiRequest from "./apiCliente";

export const getUsers = async () => {
  return apiRequest("/user/users", {
    method: "GET",
  });
};

export const setAprobadoUser = async (id) => {
  if (!id) throw new Error("Se requiere un ID de usuario");

  return apiRequest(`/user/${id}/aprobar`, {
    method: "PATCH",
  });
};

export const api = {
  async registro(datos) {
    return apiRequest("/user/register", {
      method: "POST",
      body: JSON.stringify(datos),
    });
  },

  async verificarCodigo(datos) {
    return apiRequest("/user/verify", {
      method: "POST",
      body: JSON.stringify(datos),
    });
  },
};
