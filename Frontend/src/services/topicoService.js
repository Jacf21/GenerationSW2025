import apiRequest from "./apiCliente.js";

export const crearTopico = (topico) => {
  return apiRequest("/topico/create", {
    method: "POST",
    body: JSON.stringify(topico),
  });
};

export const obtenerTopicos = () => {
  return apiRequest("/topico/getall");
};

export const obtenerTopico = (id) => {
  return apiRequest(`/topico/get/${id}`);
};

export const eliminarTopico = (id) => {
  return apiRequest(`/topico/delete/${id}`, { method: "DELETE" });
};
