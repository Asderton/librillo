const { get_un_usuario } = require("../modelos/modelos_usuarios");
const { es_url_valido } = require('./validaciones_generales');


function validar_tipo_data_usuario(nombre_usuario, foto_perfil, nombre, bio){
    if (nombre_usuario.trim() === ''){
        console.log(typeof nombre_usuario);
        return {resultado: false, status: 400, mensaje: "Nombre de usuario no puede estar vacio"};
    }
    // Faltan validaciones para contrasenia
    if (foto_perfil && !es_url_valido(foto_perfil)){
        return {resultado: false, status: 400, mensaje: "La foto de perfil no es un URL valido"};
    }
    if (nombre.trim() === ''){
        return {resultado: false, status: 400, mensaje: "El nombre del perfil no puede estar vacio"};
    }
    if (bio && bio.trim() ===  ''){
        return {resultado: false, status: 400, mensaje: "La bio no puede estar compueta solo de espacios"};
    }
    return {resultado: true};
}


function validar_nombre_usuario(nombre_usuario){ //innecesario porque simplemente va a tirar 404

    if (typeof nombre_usuario !== 'string' || nombre_usuario.trim() === ''){
        return {resultado: false, status: 400, mensaje: "Nombre de usuario invalido"};
    };
    return {resultado: true, status: 200, mensaje: "OK"};
}

async function validar_request_usuario(body){
    const {
        nombre_usuario,
        contrasenia_encriptada,
        foto_perfil,
        nombre,
        bio
    } = body;
    // Validar campos obligatorios
    if (!nombre_usuario || !contrasenia_encriptada || !nombre){
        return {resultado: false, status: 400, mensaje: "Campos obligatorios faltantes!"};
    }
    // Validar nombre de usuario unico
    if ((await get_un_usuario(nombre_usuario)) !== undefined){
        return {resultado: false, status: 409, mensaje: "El nombre de usuario escogido ya está en uso!"};
    }
    // Validar tipos de dato
    const validacion = validar_tipo_data_usuario(nombre_usuario, foto_perfil, nombre, bio);
    if (!validacion.resultado){
        return {validacion: false, status: validacion.status, mensaje: validacion.mensaje};
    }

    return {resultado: true, status: 200, mensaje: "OK"};
}

function validar_patch_usuario(body){
    const {
        nombre_usuario,
        contrasenia_encriptada,
        foto_perfil,
        nombre,
        bio
    } = body;

    if (nombre_usuario){
        return {resultado: false, status: 409, mensaje: "El nombre de usuario no puede ser modificado"};
    }

    const validacion = validar_tipo_data_usuario(nombre_usuario, foto_perfil, nombre. bio);
    if (!validacion.resultado){
        return {validacion: false, status: validacion.status, mensaje: validacion.mensaje};
    }

    return {resultado: true, status: 200, mensaje: "OK"};
}

module.exports = {validar_nombre_usuario, validar_request_usuario, validar_patch_usuario};