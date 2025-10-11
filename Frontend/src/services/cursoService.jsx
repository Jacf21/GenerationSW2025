import apiRequest from './apiCliente';

const CREAR_CURSO_ENDPOINT = '/curso/crear-curso'; 

export const crearCursoAPI = (cursoData) => {
    return apiRequest(CREAR_CURSO_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(cursoData),
    });
};