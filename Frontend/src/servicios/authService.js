import apiRequest from './apiCliente';

const AUTH_ENDPOINT = '/auth';

export const registroUsuario = (datos) => {
    return apiRequest(`${AUTH_ENDPOINT}/register`, {
        method: 'POST',
        body: JSON.stringify(datos),
    });
};

export const loginUsuario = (credenciales) => {
    return apiRequest(`${AUTH_ENDPOINT}/login`, {
        method: 'POST',
        body: JSON.stringify(credenciales),
    });
};