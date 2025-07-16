const db_client = require('./funciones_db');
const {encriptar_clave} = require('../scripts/encriptado');

async function get_all_usuarios() {
    const result = await db_client.query('SELECT * FROM usuarios');
    return (result.rows);
};

async function get_un_usuario(nombre_usuario) {
    const result = await db_client.query(`SELECT * FROM usuarios WHERE nombre_usuario = $1`,[nombre_usuario]);
    if (result.rowCount === 0){
        return undefined;
    }
    console.log(result.rows[0]);
    return (result.rows[0]);
};

async function crear_usuario(nombre_usuario, contrasenia_plana, foto_perfil = null, nombre, bio = null) {

    const contrasenia_encriptada = await encriptar_clave(contrasenia_plana);
    console.log(contrasenia_encriptada);
    const result = await db_client.query('INSERT INTO usuarios (nombre_usuario, contrasenia_encriptada, foto_perfil, nombre, bio) VALUES ($1, $2, $3, $4, $5)', [nombre_usuario, contrasenia_encriptada, foto_perfil, nombre, bio]);

    if (result.rowCount === 0){
        return undefined;
    }

    return result; // analizar bien que returnear
};

async function eliminar_usuario(nombre_usuario){
    const result = await db_client.query(`DELETE FROM usuarios WHERE nombre_usuario = $1`, [nombre_usuario]);

    if(result.rowCount === 0){
        return undefined;
    }

    return result.rows[0];
}

module.exports = {
    get_un_usuario,
    crear_usuario,
    get_all_usuarios,
    eliminar_usuario
};

