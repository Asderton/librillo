const db_client = require('./funciones_db'); 

async function Crear_etiqueta_libro(
    id_etiqueta,
    isbn_code
){
    
    const result=await db_client.query(
        'INSERT INTO etiquetas_libros (id_etiqueta, isbn_code) VALUES ($1, $2)  RETURNING *' , 
        [id_etiqueta, nombre_etiqueta]
    )
    if (result.rowCount === 0) {
        return undefined;
        }
    return result.rows[0];
}

module.exports =  Crear_etiqueta_libro;
