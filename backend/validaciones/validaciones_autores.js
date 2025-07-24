const {es_url_valido} = require('../validaciones/validaciones_generales');

function validar_request_autor(body){

    const {
        nombre_completo,
        nacionalidad,
        fecha_nacimiento,
        retrato
    } = body;

    //validar campos obligatorios
    if (!nombre_completo) {
        console.log(nombre_completo);
        return {resultado: false, status: 400, mensaje: "Campos obligatorios faltantes!"};
    };

    //validar tipos de datos
    if (nombre_completo.trim() === ''){

        return {resultado: false, status: 400, mensaje: "El nombre del autor no puede estar vacio!"};
    };
    if(nacionalidad && !Number.isInteger(Number(nacionalidad))){
        return {resultado: false, status: 400, mensaje: "Formato de nacionalidad invalido!"};


    };
    if (fecha_nacimiento && !Number.isInteger(Number(Date.parse(fecha_nacimiento)))){
        return {resultado: false, status: 400, mensaje: "Formato de fecha invalido!"};
    };
    if (retrato && !es_url_valido(retrato)){
        return {resultado: false, status: 400, mensaje: "El URL de la imagen no es valido!"};
    };


    return {resultado: true, status: 200, mensaje: "OK"};
}

module.exports = {validar_request_autor};