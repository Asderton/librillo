const {es_url_valido} = require('../validaciones/validaciones_generales');

function validar_login(body){

    const {
        username,
        clave_plana
    } = body;

    //validar campos obligatorios
    if (!username || !clave_plana) {
        return {resultado: false, status: 400, mensaje: "Campos obligatorios faltantes!"};
    };

    //validar tipos de datos
    if (username.trim() === '' || clave_plana.trim() === ''){
        return {resultado: false, status: 400, mensaje: "Los campos no pueden estar vacios!"};
    };

    return {resultado: true};
}

module.exports = {validar_login};