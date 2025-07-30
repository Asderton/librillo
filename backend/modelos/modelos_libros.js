const db_client = require('./funciones_db'); 

async function get_etiquetas_libro(isbn_code) {
    const etiquetas = await db_client.query(`
        SELECT a.id_etiqueta, a.nombre_etiqueta
        FROM etiquetas a
        INNER JOIN etiquetas_libros b ON a.id_etiqueta = b.id_etiqueta
        WHERE b.isbn_code = $1`,[isbn_code]);
    
    if (etiquetas.rowCount === 0){
        return null;
    }
    return etiquetas.rows;
};

async function get_libros_autor(id_autor) {
    const libros = await db_client.query(`
        SELECT isbn_code, imagen_portada, titulo
        FROM libros 
        INNER JOIN autores ON libros.id_autor = autores.id_autor
        WHERE autores.id_autor = $1`, [id_autor]);
    
    if (libros.rowCount === 0){
        return null;
    }
    return libros.rows;
}

async function Obtener_libros() {

    const query=`
    SELECT l.isbn_code, l.titulo, l.fecha_publicacion, l.numero_de_paginas, l.imagen_portada, i.nombre_idioma AS idioma, a.nombre_completo AS autor
    FROM libros l
    LEFT JOIN autores a ON l.id_autor=a.id_autor
    LEFT JOIN idiomas i ON i.id_idioma=l.idioma_id
    GROUP BY 
    l.isbn_code,
    l.titulo,
    l.fecha_publicacion,
    l.numero_de_paginas,
    l.imagen_portada,
    i.nombre_idioma,
    a.nombre_completo
    ORDER BY l.titulo
    `;


    const result= await db_client.query(query);
    return result.rows.map(row => ({
        isbn_code: row.isbn_code,
        titulo: row.titulo,
        fechaPublicacion: row.fecha_publicacion,
        numeroDePaginas: row.numero_de_paginas,
        imagen_portada: row.imagen_portada,
        autor: row.autor,
    }));
}

async function Obtener_libro(isbn_code) {

    const result = await db_client.query(`
    SELECT l.isbn_code, l.titulo, l.descripcion, l.fecha_publicacion, l.numero_de_paginas, l.imagen_portada, l.id_autor, a.nombre_completo AS autor, i.nombre_idioma AS idioma
    FROM libros l
    LEFT JOIN autores a ON a.id_autor = l.id_autor
    LEFT JOIN idiomas i ON i.id_idioma = l.idioma_id
    WHERE l.isbn_code = $1;
    `, [isbn_code]);

    if (result.rowCount === 0){ 
        return undefined;
    }

    const etiquetas = await get_etiquetas_libro(isbn_code);
    const libros_autor = await get_libros_autor(result.rows[0].id_autor);


    return {...result.rows[0], etiquetas, libros_autor};
}

async function Crear_libro(
    isbn_code,
    titulo,
    id_autor = null,
    descripcion = null,
    fecha_publicacion = null,
    numero_de_paginas = null,
    imagen_portada = null,
    idioma_id = null
)
{
    const result=await db_client.query(
        'INSERT INTO libros (isbn_code,titulo, id_autor, descripcion,fecha_publicacion,numero_de_paginas,imagen_portada,idioma_id ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)  RETURNING *' , [isbn_code,titulo,id_autor,descripcion,fecha_publicacion,numero_de_paginas,imagen_portada,idioma_id]
    )
    if (result.rowCount === 0) {
        return undefined;
    }
    return result.rows[0];
}

async function Eliminar_libro(isbn_code){

    const result=await db_client.query('DELETE FROM libros WHERE isbn_code=$1 RETURNING titulo' , [isbn_code]);
    
    if (result.rowCount === 0) {
        return undefined;
    }
    return result.rows[0].titulo;
}
   

async function Actualizar_libro(
    isbn_code,
    titulo,
    descripcion,
    fecha_publicacion,
    numero_de_paginas,
    imagen_portada,
    idioma_id
) {

    const result = await db_client.query(
    'UPDATE libros SET titulo = $2, descripcion = $3, fecha_publicacion=$4,numero_de_paginas = $5, imagen_portada=$6,idioma_id = $7  WHERE isbn_code = $1  RETURNING titulo',
    [ isbn_code, titulo, descripcion, fecha_publicacion,numero_de_paginas,imagen_portada, idioma_id]
    );
    
    if (result.rowCount === 0) {
        return undefined;
    }
    return result.rows[0].titulo;
}

module.exports = {
    Obtener_libros,
    Obtener_libro,
    Crear_libro,
    Eliminar_libro,
    Actualizar_libro
};
