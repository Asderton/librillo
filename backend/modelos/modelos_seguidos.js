const db_client = require('./funciones_db');

async function get_all_seguidos(username) {
    const seguidos = await db_client.query('SELECT nombre, foto_perfil FROM usuarios INNER JOIN seguidos ON usuarios.nombre_usuario = seguidos.nombre_usuario_seguido WHERE seguidos.nombre_usuario_seguidor = $1', [username]);
    if (seguidos.rowCount === 0){
        return null;
    }
    return (seguidos.rows);
};

async function get_all_seguidores(username) {
    const seguidores = await db_client.query('SELECT nombre, foto_perfil FROM usuarios INNER JOIN seguidos ON usuarios.nombre_usuario = seguidos.nombre_usuario_seguidor WHERE seguidos.nombre_usuario_seguido = $1', [username]);
    if (seguidores.rowCount === 0){
        return null;
    }
    return (seguidores.rows);
};




module.exports = {get_all_seguidos, get_all_seguidores};