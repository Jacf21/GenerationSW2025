const cursoService = require('../services/cursoServices');

const generarCodigoUnico = async () => {
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

module.exports = { generarCodigoUnico };