const db_client = require('./funciones_db');


async function get_bibliotecas_username(username) {
    const bibliotecas = await db_client.query('SELECT * FROM bibliotecas WHERE nombre_usuario_propietario = $1',[username]);
    if (bibliotecas.rowCount === 0){
        return undefined;
    }
    return bibliotecas.rows;
};

async function get_libros_biblioteca(id_biblioteca) {
    const libros = await db_client.query('SELECT libros.isbn_code, titulo, imagen_portada FROM libros INNER JOIN biblioteca_libro ON libros.isbn_code = biblioteca_libro.isbn_code WHERE id_biblioteca = $1', [id_biblioteca]);
    if(libros.rowCount === 0) {
        return undefined
    };
    return libros.rows;
};

async function crear_biblioteca(username_creador, nombre_biblioteca, icono = null) {
    const biblioteca_creada = await db_client.query('INSERT INTO bibliotecas (nombre_usuario_propietario, nombre_biblioteca, icono) VALUES ($1, $2, $3) RETURNING nombre_biblioteca',[username_creador, nombre_biblioteca, icono]);
    if(biblioteca_creada.rowCount === 0){
        return undefined;
    }
    return biblioteca_creada;
}

async function get_creador_biblioteca(id_biblioteca) {
    const creador = await db_client.query('SELECT nombre_usuario_propietario FROM bibliotecas WHERE id_biblioteca = $1', [id_biblioteca]);
    if (creador.rowCount === 0){
        return undefined;
    }
    return creador.rows[0].nombre_usuario_propietario;
}


async function agregar_libro_biblioteca(username_cliente, id_biblioteca, isbn_code) {
    const username_credor = await get_creador_biblioteca(id_biblioteca);
    if (username_credor === undefined || username_credor !== username_cliente){
        return {status: 401, error: "No eres dueño de esta biblioteca"};
    }
    try{    
        const libro_agregado = await db_client.query('INSERT INTO biblioteca_libro (id_biblioteca, isbn_code) VALUES ($1, $2) RETURNING isbn_code',[id_biblioteca, isbn_code]);
        console.log(`el libro es ${libro_agregado}`);
        return libro_agregado.rows[0];
    }
    catch(error){
        if (error.code === '23503'){
            console.log("Violacion de foreign key. El libro no existe");
            return {status: 404, error: "El libro que quieres agregar no existe"};
        }
        if (error.code === '23505'){
            console.log("Violacion de primary key. El libro ya esta en la biblioteca");
            return {status: 401, error: "El libro que quieres agregar ya esta en la biblioteca"};
        }
        return {status: 400, error: "Error desconocido"};
    }
}

async function eliminar_biblioteca(id_biblioteca) {

    console.log(id_biblioteca);
    const biblioteca_eliminada = await db_client.query('DELETE FROM bibliotecas WHERE id_biblioteca = $1 RETURNING nombre_biblioteca',[id_biblioteca]);
    if (biblioteca_eliminada.rowCount === 0){
        return undefined;
    }
    return biblioteca_eliminada.rows[0].nombre_biblioteca; 
}

async function eliminar_libro_biblioteca(id_biblioteca, isbn_code) {

    const libro_eliminado = await db_client.query('DELETE FROM biblioteca_libro WHERE isbn_code = $1 AND id_biblioteca = $2 RETURNING isbn_code',[isbn_code, id_biblioteca]);
    if (libro_eliminado.rowCount === 0){
        return undefined;
    }
    return libro_eliminado.rows[0].isbn_code; 
}

async function modificar_biblioteca(id_biblioteca, nombre_biblioteca, icono = null) {
    const libro_modificado = await db_client.query('UPDATE bibliotecas SET nombre_biblioteca = $1, icono = $2 WHERE id_biblioteca = $3 RETURNING nombre_biblioteca',[nombre_biblioteca, icono, id_biblioteca]);
    if (libro_modificado.rowCount === 0){
        return undefined;
    }
    return libro_modificado.rows[0].nombre_biblioteca;
}



module.exports = {get_bibliotecas_username, get_libros_biblioteca, crear_biblioteca, agregar_libro_biblioteca, eliminar_biblioteca, eliminar_libro_biblioteca, modificar_biblioteca}