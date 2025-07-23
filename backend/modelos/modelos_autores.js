const db_client = require('./funciones_db');

async function get_all_autores() {
    const autores = await db_client.query('SELECT * FROM autores');
    return (autores.rows);
};

async function get_un_autor(id_autor) {
    const autor = await db_client.query(`
        SELECT nombre_completo, nombre_pais, fecha_nacimiento, retrato
        FROM autores 
        INNER JOIN paises
        ON nacionalidad = id_pais
        WHERE id_autor = ${id_autor}
        `)
    if (autor.rowCount === 0){
        return undefined;
    }

    return (autor.rows[0]);
};

async function crear_autor(nombre_completo, nacionalidad, fecha_nacimiento = null, retrato = null){
    try{    
        const autor_creado = await db_client.query(`INSERT INTO autores (nombre_completo, nacionalidad, fecha_nacimiento, retrato) VALUES ($1, $2, $3, $4)`, [nombre_completo, nacionalidad, fecha_nacimiento, retrato]);
        if (autor_creado.rowCount === 0) {
            return undefined;
        }
        console.log(autor_creado);
        return autor_creado;
    }
    catch (error){
        if (error.code === 23503){
            console.log("Error de violacion de clave foranea. Nacionalidad no existe");
            return undefined;
        }
        console.log(error);
    }
};

async function eliminar_autor(id_autor) {
    const result = await db_client.query(`DELETE FROM autores WHERE id_autor = $1 RETURNING nombre_completo`,[id_autor]);
    if (result.rowCount === 0){
        result = undefined;
    }
    return result.rows[0].nombre_completo; 
}

async function actualizar_autor(id_autor, nombre_completo, nacionalidad, fecha_nacimiento = null, retrato = null) {
    try{
        const result = await db_client.query(`UPDATE autores SET nombre_completo = $1, nacionalidad = $2, fecha_nacimiento = $3, retrato = $4 WHERE id_autor = $5 RETURNING nombre_completo`, [nombre_completo, nacionalidad, fecha_nacimiento, retrato, id_autor]);
        if (result.rowCount === 0){
            return undefined;
        };

        return result.rows[0].nombre_completo;
    }
    catch(error){
        if (error.code === 23503){
            console.log("Error de violacion de clave foranea. Nacionalidad no existe");
            return undefined;
        }
    }
}




module.exports = {
    get_all_autores,
    get_un_autor,
    crear_autor,
    eliminar_autor,
    actualizar_autor
};

