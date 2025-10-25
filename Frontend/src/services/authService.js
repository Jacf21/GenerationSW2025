import apiRequest from "./apiCliente";

export const login = async (email, password) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const enviarCodigo = async (email) => {
  return apiRequest("/auth/send-code", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};
