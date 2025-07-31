const { comparar_claves } = require('../scripts/encriptado');
const db_client = require('./funciones_db');

async function logear_usuario(username, clave_plana) {
    const usuario = await db_client.query('SELECT * FROM usuarios WHERE nombre_usuario = $1',[username]);
    if (usuario.rowCount === 0){
        return undefined;
    }

    const clave_hash = usuario.rows[0].contrasenia_encriptada;
    const match_clave = await comparar_claves(clave_plana, clave_hash);
    if(!match_clave){
        return false;  //que retorno aca?
    }

    const {
        nombre_usuario,
        foto_perfil,
        nombre
    } = usuario.rows[0]

    const logged_data = {
        username: nombre_usuario,
        foto_perfil: foto_perfil,
        nombre: nombre
    }
    return logged_data;
};



module.exports = {logear_usuario};