import apiRequest from "./apiCliente";

const CREAR_CURSO_ENDPOINT = "/curso/crear-curso";

export const crearCursoAPI = (cursoData, id_user) => {
  const payload = {
    ...cursoData,
    id_user,
  };

  return apiRequest(CREAR_CURSO_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getMisCursos = (id_user) => {
  return apiRequest(`/curso/${id_user}/mis-cursos`, {
    method: "GET",
  });
};

export const actualizarCurso = (id, datos) => {
  return apiRequest(`/curso/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(datos),
  });
};

export const desactivarCurso = (id) => {
  return apiRequest(`/curso/${id}/desactivar`, {
    method: "PATCH",
  });
};
