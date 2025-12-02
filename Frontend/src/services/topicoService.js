const PORT = parseInt(import.meta.env.VITE_PORTBACK) || 5000;

const API_URL = import.meta.env.VITE_API_URL || `http://localhost:${PORT}/api`;
const BASE = `${API_URL}`;

export const crearTopico = async (payload) => {
  const res = await fetch(`${BASE}/topico/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Create failed ${res.status}`);
  return res.json();
};

export const obtenerTopicos = async () => {
  const res = await fetch(`${BASE}/topico/getall`, { credentials: "include" });
  if (!res.ok) throw new Error(`GetAll failed ${res.status}`);
  return res.json();
};

export const actualizarTopico = async (id, datos) => {
  const res = await fetch(`${BASE}/topico/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(datos),
  });
  if (!res.ok) throw new Error(`Update failed ${res.status}`);
  return res.json();
};

export const eliminarTopico = async (id) => {
  const res = await fetch(`${BASE}/topico/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Delete failed ${res.status}`);
  return res.json();
};
