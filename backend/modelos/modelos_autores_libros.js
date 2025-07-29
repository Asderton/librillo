const db_client = require('./funciones_db');

async function asignar_autor_a_libro(isbn_code, id_autor) {
    try{
        const autor_asignado = await db_client.query('INSERT INTO libros_autor (isbn_code, id_autor) VALUES ($1, $2) RETURNING id_autor', [isbn_code, id_autor]);
        return autor_asignado.rows[0].id_autor;
    }
    catch(error){
        if (error.code === '23503'){
            return {status: 404, error: "Libro o Autor no esta disponible o no existe"};
        }
        console.log(error);
        return {status: 400, error: "Error desconocido"};
    }
}


module.exports = {
    asignar_autor_a_libro
};
