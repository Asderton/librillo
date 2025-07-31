const { get_un_usuario } = require("../modelos/modelos_usuarios");
const { es_url_valido } = require('./validaciones_generales');


function validar_tipo_data_usuario(foto_perfil, nombre, bio){
    
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



async function validar_crear_usuario(body){
    const {
        username,
        clave_plana,
        foto_perfil,
        nombre,
        bio
    } = body;
    
    // Validar campos obligatorios
    if (!username || !clave_plana || !nombre){
        return {resultado: false, status: 400, mensaje: "Campos obligatorios faltantes!"};
    }
    if (username.trim() === ''){
        return {resultado: false, status: 400, mensaje: "Nombre de usuario no puede estar vacio"};
    }
    // Validar nombre de usuario unico
    if ((await get_un_usuario(username)) !== undefined){
        return {resultado: false, status: 409, mensaje: "El nombre de usuario escogido ya está en uso!"};
    }
    const regex_username = /^[a-zA-Z0-9_.-]{3,30}$/;
    if (!regex_username.test(username)){
        return {resultado: false, status: 400, mensaje: "El username debe tener entre 3 y 30 caracteres, permite _ . - como caracteres especiales"};
    }
    // Validar tipos de dato
    const validacion = validar_tipo_data_usuario(foto_perfil, nombre, bio);
    if (!validacion.resultado){
        return {validacion: false, status: validacion.status, mensaje: validacion.mensaje};
    }

    return {resultado: true, status: 200, mensaje: "OK"};
}

function validar_put_usuario(body){
    const {
        username,
        foto_perfil,
        nombre,
        bio
    } = body;

    if (username){
        return {resultado: false, status: 409, mensaje: "El nombre de usuario no puede ser modificado"};
    }

    const validacion = validar_tipo_data_usuario(foto_perfil, nombre, bio);
    if (!validacion.resultado){
        return {validacion: false, status: validacion.status, mensaje: validacion.mensaje};
    }

    return {resultado: true, status: 200, mensaje: "OK"};
}

module.exports = {validar_crear_usuario, validar_put_usuario};