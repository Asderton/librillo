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

async function crear_seguidor(usuario_seguidor, usuario_a_seguir) {
    try{
        const seguido = await db_client.query('INSERT INTO seguidos (nombre_usuario_seguidor, nombre_usuario_seguido) VALUES ($1, $2) RETURNING nombre_usuario_seguido', [usuario_seguidor, usuario_a_seguir]);
        return seguido;
    }
    catch(error){
        if (error.code === 23503){
            console.log("Referencia a usuario no existente");
            return undefined
        }
    }
};

async function eliminar_seguidor(usuario_seguidor, usuario_a_unfollow) {
    const no_seguido = await db_client.query('DELETE FROM seguidos WHERE nombre_usuario_seguidor = $1 AND nombre_usuario_seguido = $2 RETURNING nombre_usuario_seguido',[usuario_seguidor, usuario_a_unfollow]);
    if (no_seguido.rowCount === 0){
        return undefined;
    }
    return no_seguido;
};

module.exports = {get_all_seguidos, get_all_seguidores, crear_seguidor, eliminar_seguidor};