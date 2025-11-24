import apiRequest from "./apiCliente";

// Agregar contenido a una pantalla
export const agregarContenidoAplantilla = (payload) =>
  apiRequest(`/contenido-pantalla`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

// Obtener contenido de una pantalla específica
export const obtenerContenidosDePantalla = (id_pantalla) =>
  apiRequest(`/contenido-pantalla/pantalla/${id_pantalla}`, {
    method: "GET",
  });

// Eliminar contenido por ID
export const eliminarContenidoDePantalla = (id) =>
  apiRequest(`/contenido-pantalla/${id}`, {
    method: "DELETE",
  });
