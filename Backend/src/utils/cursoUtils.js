// src/utils/cursoUtils.js
import * as cursoService from "../services/cursoServices.js"; // ✅ Import ESM

export const generarCodigoUnico = async () => {
  const generarCodigo = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  let codigo;
  let cursoExistente = true;

  while (cursoExistente) {
    codigo = generarCodigo();
    cursoExistente = await cursoService.buscarCursoPorCodigo(codigo);
  }

  return codigo;
};
