/*
const db_client = require('./funciones_db');

async function get_all_autores() {
    const result = await db_client.query('SELECT * FROM autores');
    return (result.rows);
};

async function get_un_autor(id_autor) {
    const result = await db_client.query(`SELECT * FROM autores WHERE id_autor = ${id_autor}`)
    return (result.rows[0]);
};

async function crear_autor(nombre_completo, nacionalidad, fecha_nacimiento = null, retrato = null){
    const result = await db_client.query(`INSERT INTO autores (nombre_completo, nacionalidad, fecha_nacimiento, retrato) VALUES ($1, $2, $3, $4)`, [nombre_completo, nacionalidad, fecha_nacimiento, retrato]);

    if (result.rowCount === 0) {
        return undefined;
    }
    
    return result;
};


async function eliminar_autor(id_autor) {
    const result = await db_client.query(`DELETE FROM autores WHERE id_autor = $1 RETURNING nombre_completo`,[id_autor]);

    if (result.rowCount === 0){
        result = undefined;
    }

    return result.rows[0].nombre_completo; 
}

//Por ahora asumo que esta validado que ya viene todo :)
async function actualizar_autor(id_autor, nombre_completo, nacionalidad, fecha_nacimiento = null, retrato = null) {
    const result = await db_client.query(
        `UPDATE autores 
        SET nombre_completo = $1, nacionalidad = $2, fecha_nacimiento = $3, retrato = $4
        WHERE id_autor = $5
        RETURNING nombre_completo`, [nombre_completo, nacionalidad, fecha_nacimiento, retrato, id_autor]
    );

    if (result.rowCount === 0){
        return undefined;
    };

    return result.rows[0].nombre_completo;
}




module.exports = {
    get_all_autores,
    get_un_autor,
    crear_autor,
    eliminar_autor,
    actualizar_autor
};

*/

