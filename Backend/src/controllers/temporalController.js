const store = new Map();

export const setCodigo = (email, codigo) => {
  const expiracion = Date.now() + 5 * 60 * 1000; // 5 minutos
  store.set(email, { codigo, expiracion });
};

export const getCodigo = (email) => {
  const data = store.get(email);
  if (!data) return null;
  if (Date.now() > data.expiracion) {
    store.delete(email);
    return null;
  }
  return data.codigo;
};

export const deleteCodigo = (email) => {
  store.delete(email);
};