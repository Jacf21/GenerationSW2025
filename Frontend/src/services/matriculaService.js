import apiRequest from "./apiCliente";

export const matricularsePorCodigo = (codigo, id_usuario) => {
  return apiRequest("/matricula/enroll", {
    method: "POST",
    body: JSON.stringify({ codigo, id_usuario }),
  });
};

export const obtenerMisMatriculas = (id_usuario) => {
  return apiRequest(`/matricula/${id_usuario}/mis-matriculas`, { method: "GET" });
};