const BASE_URL = "http://localhost:5000/api";

// Función genérica de manejo de errores
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData = {};

    try {
      errorData = await response.json();
    } catch {
      throw new Error(`Error del servidor: ${response.status} (Respuesta no JSON).`);
    }

    const errorMessage =
      errorData.error || errorData.message || `Error del servidor: ${response.status}`;

    throw new Error(errorMessage);
  }

  return response.status === 204 ? null : response.json();
};

const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  // ✅ Detectamos si el body es FormData
  const isFormData = options.body instanceof FormData;

  const defaultHeaders = {};

  // ✅ Solo agregamos Content-Type si NO es FormData
  if (!isFormData) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const config = {
    method: options.method || "GET",
    headers: { ...defaultHeaders, ...(options.headers || {}) },
    body: options.body,
  };

  const response = await fetch(url, config);
  return handleResponse(response);
};

export default apiRequest;
