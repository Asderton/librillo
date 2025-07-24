const db_client = require('./funciones_db');
const {encriptar_clave} = require('../scripts/encriptado');

async function get_all_usuarios() {
    const usuarios = await db_client.query('SELECT * FROM usuarios');
    return (usuarios.rows);
};

async function get_un_usuario(username) {
    const usuario = await db_client.query(`SELECT * FROM usuarios WHERE nombre_usuario = $1`,[username]);
    if (usuario.rowCount === 0){
        return undefined;
    }
    return (usuario.rows[0]);
};

async function crear_usuario(username, clave_plana, foto_perfil = null, nombre, bio = null) {
    const clave_hash = await encriptar_clave(clave_plana);
    try{
        const result = await db_client.query('INSERT INTO usuarios (nombre_usuario, contrasenia_encriptada, foto_perfil, nombre, bio) VALUES ($1, $2, $3, $4, $5) RETURNING nombre_usuario, foto_perfil', [username, clave_hash, foto_perfil, nombre, bio]);
        if (result.rowCount === 0){
            return undefined;
        }
        return result.rows;
    }
    catch(error){
        if (error.code === 23505){
            console.log("Violacion de primary key. Nombre de usuario duplicado");
            return undefined;
        }
    }
};

async function eliminar_usuario(username){
    const result = await db_client.query(`DELETE FROM usuarios WHERE nombre_usuario = $1`, [username]);
    if(result.rowCount === 0){
        return undefined;
    }

    return result;
}

module.exports = {
    get_un_usuario,
    crear_usuario,
    get_all_usuarios,
    eliminar_usuario
};

