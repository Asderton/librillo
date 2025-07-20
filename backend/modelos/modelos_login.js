const db_client = require('./funciones_db');

async function logear_usuario(username, clave_plana) {
    const usuario = await db_client.query('SELECT * FROM usuarios WHERE nombre_usuario = $1',[username]);
    if (usuario.rowCount === 0){
        return undefined;
    }

    
    console.log(usuario.rows[0].contrasenia_encriptada);

    return usuario.rows;
};

module.exports = {logear_usuario};