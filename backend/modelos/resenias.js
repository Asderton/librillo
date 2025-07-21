const db_client = require('./funciones_db'); 

async function Obtener_resenias(isbn_code) {

    const query=`
    SELECT r.nombre_usuario, r.calificacion, r.body, l.isbn_code, l.titulo
    FROM resenias r
    JOIN libros l ON l.isbn_code=r.isbn_code
    WHERE l.isbn_code=$1
    ORDER BY nombre_usuario ASC
    `;
    

    const result= await db_client.query(query, [isbn_code]);
    if (result.rowCount===0){ 
        return undefined;
    }
    const resenia = {
        isbnCode: result.rows[0].isbn_code,
        titulo: result.rows[0].titulo,
        resenias: [],
        };
        
        const reseniasSet = new Set();
        
        result.rows.forEach(row => {

            if (row.nombre_usuario && !reseniasSet.has(row.nombre_usuario)) {
                reseniasSet.add(row.nombre_usuario);
                resenia.resenias.push({
                  nombreUsuario: row.nombre_usuario,
                  calificacion: row.calificacion,
                  body: row.body
                });
            }
        });

    return resenia;
}

async function Crear_resenia(nombre_usuario, isbn_code, calificacion, body) {

    const result = await db_client.query(
    'INSERT INTO resenias (nombre_usuario, isbn_code, calificacion, body) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre_usuario, isbn_code, calificacion, body]
    );
    
    if (result.rowCount === 0) {
    return undefined;
    }
    return result.rows[0];
}
    
async function Eliminar_resenia(nombre_usuario, isbn_code) {
    const result = await db_client.query(
    'DELETE FROM resenias  WHERE nombre_usuario=$1 AND isbn_code=$2 RETURNING nombre_usuario',
    [nombre_usuario, isbn_code]
    );

    if (result.rowCount === 0) {
    return undefined;
    }

    return result.rows[0].nombre_usuario;
}
    
async function Actualizar_resenia(nombre_usuario, isbn_code, calificacion, body) {
    const result = await db_client.query(
    'UPDATE resenias SET calificacion = $3, body = $4 WHERE nombre_usuario = $1 AND isbn_code = $2 RETURNING nombre_usuario',
    [nombre_usuario, isbn_code, calificacion, body]
    );

    if (result.rowCount === 0) {
    return undefined;
    }

    return result.rows[0].nombre_usuario;
}


module.exports = {
    Obtener_resenias,
    Crear_resenia,
    Eliminar_resenia,
    Actualizar_resenia
};