const db_client = require('./funciones_db'); 


async function Obtener_libros() {

    const query=`
    SELECT l.isbn_code, l.titulo, l.fecha_publicacion, l.numero_de_paginas, l.imagen_portada, i.nombre_idioma AS idioma, a.nombre_completo AS autor, 
    ROUND(AVG(r.calificacion),2) AS promedio_calificacion
    FROM libros l
    LEFT JOIN libros_autor la ON l.isbn_code=la.isbn_code
    LEFT JOIN autores a ON a.id_autor=la.id_autor
    LEFT JOIN idiomas i ON i.id_idioma=l.idioma_id
    GROUP BY 
    l.isbn_code,
    l.titulo,
    l.fecha_publicacion,
    l.numero_de_paginas,
    l.imagen_portada,
    i.nombre_idioma,
    a.nombre_completo
    ORDER BY l.fecha_publicacion DESC
    `;


    const result= await db_client.query(query);
    return result.rows.map(row => ({
        isbn: row.isbn_code,
        titulo: row.titulo,
        fechaPublicacion: row.fecha_publicacion,
        numeroDePaginas: row.numero_de_paginas,
        imagen: row.imagen_portada,
        autor: row.autor,
        calificacionPromedio: row.promedio_calificacion || 0
    }));
}

async function Obtener_libro(isbn_code) {

    const query=`
    SELECT l.isbn_code, l.titulo, l.descripcion,l.fecha_publicacion, l.numero_de_paginas, l.imagen_portada, e.nombre_etiqueta,
    i.nombre_idioma AS idioma, a.nombre_completo AS autor, 
    r.nombre_usuario, r.calificacion, r.body, prom.promedio 
    FROM libros l
    JOIN libros_autor la ON l.isbn_code=la.isbn_code
    LEFT JOIN autores a ON a.id_autor=la.id_autor
    LEFT JOIN idiomas i ON i.id_idioma=l.idioma_id
    LEFT JOIN etiquetas_libros el ON l.isbn_code=el.isbn_code
    LEFT JOIN etiquetas e ON e.id_etiqueta=el.id_etiqueta
    LEFT JOIN (SELECT * FROM resenias
                 WHERE isbn_code=$1
                 ORDER BY nombre_usuario ASC
                 LIMIT 10)
                 r ON r.isbn_code=l.isbn_code
    LEFT JOIN (SELECT isbn_code, ROUND(AVG(calificacion),2)AS promedio
                FROM resenias
                 WHERE isbn_code=$1
                 GROUP BY isbn_code
                )
                 prom ON prom.isbn_code=l.isbn_code

    Where l.isbn_code=$1
    `;
    

    const result= await db_client.query(query, [isbn_code]);
    if (result.rowCount===0){ 
        return undefined;
    }
    const libro = {
        isbnCode: result.rows[0].isbn_code,
        titulo: result.rows[0].titulo,
        descripcion: result.rows[0].descripcion,
        FechaPublicacion: result.rows[0].fecha_publicacion,
        numeroDePaginas: result.rows[0].numero_de_paginas,
        imagen: result.rows[0].imagen_portada,
        idioma: result.rows[0].idioma,
        autor: result.rows[0].autor,
        etiquetas: [],
        resenias: []
        };
        
        const etiquetasSet = new Set();
        const reseniasSet = new Set();
        
        result.rows.forEach(row => {
            if (row.nombre_etiqueta && !etiquetasSet.has(row.nombre_etiqueta)) {
            etiquetasSet.add(row.nombre_etiqueta);
            libro.etiquetas.push(row.nombre_etiqueta);
            }

            if (row.nombre_usuario && !reseniasSet.has(row.nombre_usuario)) {
                reseniasSet.add(row.nombre_usuario);
                libro.resenias.push({
                  NombreUsuario: row.nombre_usuario,
                  calificacion: row.calificacion,
                  body: row.body
                });
            }
        });

    return libro;
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
    
    const result=await db_client.query(
        'INSERT INTO libros (isbn_code,titulo,fecha_publicacion,descripcion,numero_de_paginas,imagen_portada,idioma_id ) VALUES ($1, $2, $3, $4, $5, $6, $7)  RETURNING *' , [isbn_code,titulo,fecha_publicacion,descripcion,numero_de_paginas,imagen_portada,idioma_id]
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
   

async function Actualizar_libro(isbn_code) {

    const result = await db_client.query(
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
