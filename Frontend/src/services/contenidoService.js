import apiRequest from "./apiCliente.js";

export const subirContenido = (data) => {
  const formData = new FormData();
  formData.append("archivo", data.archivo);
  formData.append("id_topico", data.id_topico);
  formData.append("tipo", data.tipo);

  return apiRequest("/contenido/up", {
    method: "POST",
    body: formData,
  });
};

export const eliminarContenido = (id) => {
  return apiRequest(`/contenido/delete/${id}`, { method: "DELETE" });
};

export const obtenerContenidosPorTopico = async (id_topico) => {
  const res = await apiRequest(`/contenido/topico/${id_topico}`);
  return res.data || [];
};
