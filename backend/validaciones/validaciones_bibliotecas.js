const {es_url_valido} = require('../validaciones/validaciones_generales');

function validar_request_biblioteca(body){

    const {
        nombre_biblioteca,
        icono
    } = body;

    //validar campos obligatorios
    if (!nombre_biblioteca) {
        return {resultado: false, status: 400, mensaje: "Campos obligatorios faltantes!"};
    };

    if (nombre_biblioteca.trim() === ''){
        return {resultado: false, status: 400, mensaje: "Nombre de biblioteca no puede ser vacio!"};
    }

    if (icono && !es_url_valido(icono)){
        return {resultado: false, status: 400, mensaje: "El URL de la imagen no es valido!"};
    }

    return {resultado: true, status: 200, mensaje: "OK"};
}

module.exports = {validar_request_biblioteca};