const API_URL = 'http://localhost:5000/api';

export const crearCursoAPI = async (cursoData) => {
    const response = await fetch(`${API_URL}/curso/crear-curso`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cursoData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fallo la creación del curso.');
    }

    return response.json();
};