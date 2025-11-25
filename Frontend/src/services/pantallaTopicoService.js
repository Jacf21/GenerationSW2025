import apiRequest from "./apiCliente";

// Crear pantalla
export const crearPantallaTopico = (payload) =>
  apiRequest(`/pantalla-topico`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

// Obtener pantalla por id
export const obtenerPantalla = (id) => apiRequest(`/pantalla-topico/${id}`);

// Obtener pantalla de un tópico
export const obtenerPantallaPorTopico = (id_topico) =>
  apiRequest(`/pantalla-topico/topico/${id_topico}`);

// Actualizar pantalla
export const actualizarPantalla = (id, payload) =>
  apiRequest(`/pantalla-topico/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
