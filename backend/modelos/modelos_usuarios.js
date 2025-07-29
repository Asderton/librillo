const db_client = require('./funciones_db');
const {encriptar_clave} = require('../scripts/encriptado');

async function get_all_usuarios() {
    const usuarios = await db_client.query('SELECT * FROM usuarios');
    return (usuarios.rows);
};

async function get_un_usuario(username) {
    const usuario = await db_client.query(`SELECT nombre_usuario AS username, foto_perfil, nombre, bio FROM usuarios WHERE nombre_usuario = $1`,[username]);
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
        if (error.code === '23505'){
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

async function editar_usuario(username, nombre, foto_perfil = null, bio = null) {

    const usuario_creado = await db_client.query('UPDATE usuarios SET nombre = $1, foto_perfil = $2, bio = $3 WHERE nombre_usuario = $4 RETURNING nombre_usuario', [nombre, foto_perfil, bio, username]);
    if (usuario_creado.rowCount === 0){
        return undefined;
    }

    return usuario_creado.rows[0].nombre_usuario;
}

module.exports = {
    get_un_usuario,
    crear_usuario,
    get_all_usuarios,
    eliminar_usuario,
    editar_usuario
};

