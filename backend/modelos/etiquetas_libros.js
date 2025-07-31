const db_client = require('./funciones_db'); 

async function Crear_etiqueta_libro(
    id_etiqueta,
    isbn_code
){
    
    const result=await db_client.query(
        'INSERT INTO etiquetas_libros (id_etiqueta, isbn_code) VALUES ($1, $2)  RETURNING *' , 
        [id_etiqueta, isbn_code]
    )
    return result.rows[0];
}

async function Eliminar_etiqueta_libro(id_etiqueta,isbn_code){

    const query=`DELETE FROM etiquetas_libros WHERE id_etiqueta=$1 AND isbn_code=$2 RETURNING id_etiqueta`;

    const result=await db_client.query(query , [id_etiqueta,isbn_code]);
    
    if (result.rowCount === 0) {
        return undefined;
    }
    return result.rows[0].id_etiqueta;
}

module.exports = {
    Crear_etiqueta_libro,
    Eliminar_etiqueta_libro

 };
