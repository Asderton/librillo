const dbclient = require('./funciones_db'); 


async function Obtener_libros() {
    const result= await dbclient.query('SELECT * FROM libros');
    return result.rows;
}

async function Obtener_libro(isbn_code) {
    const result= await dbclient.query('SELECT * FROM libros WHERE isbn_code=$1', [isbn_code]);
    if (result.rowCount===0){ 
        return undefined;
    }
    return result.rows[0];
}

async function Crear_libro(
    isbn_code,
    titulo,
    fecha_publicacion,
    descripcion,
    numero_de_paginas,
    imagen_portada,
    idioma_id 
) {
    
    const result=await dbclient.query(
        'INSERT INTO libros (isbn_code,titulo,fecha_publicacion,descripcion,numero_de_paginas,imagen_portada,idioma_id ) VALUES ($1, $2, $3, $4, $5, $6, $7)  RETURNING *' , [isbn_code,titulo,fecha_publicacion,descripcion,numero_de_paginas,imagen_portada,idioma_id]
    )
    if (result.rowCount === 0) {
        return undefined;
        }
    return result.rows[0];
}

async function Eliminar_libro(isbn_code){

    const result=await dbclient.query('DELETE FROM libros WHERE isbn_code=$1 RETURNING titulo' , [isbn_code]);
    
    if (result.rowCount === 0) {
        return undefined;
    }
    return result.rows[0].titulo;
}
   

async function Actualizar_libro(isbn_code) {

    const result = await dbclient.query(
    'UPDATE libros SET  titulo = $2, descripcion = $3, numero_de_paginas = $4, idioma_id = $5  WHERE isbn_libro = $1  RETURNING titulo',
    [ titulo, descripcion, numero_de_paginas, idioma_id, isbn_code]
    );
    
    if (result.rowCount === 0) {
        return undefined;
    }
    return rows[0].titulo;
}

module.exports = {
    Obtener_libros,
    Obtener_libro,
    Crear_libro,
    Eliminar_libro,
    Actualizar_libro
};
