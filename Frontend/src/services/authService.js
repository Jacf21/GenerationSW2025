import apiRequest from "./apiCliente";

export const login = async (email, password) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};
