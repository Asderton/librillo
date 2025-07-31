const db_client = require('./funciones_db'); 

async function Obtener_etiquetas() {
    const result= await db_client.query('SELECT * FROM etiquetas');
    return result.rows;
}

async function Obtener_etiqueta(id_etiqueta) {
    const result= await db_client.query('SELECT * FROM etiquetas WHERE id_etiqueta=$1', [id_etiqueta]);
    if (result.rowCount===0){ 
        return undefined;
    }
    return result.rows[0];
}

async function Crear_etiqueta(nombre_etiqueta){

    const query='INSERT INTO etiquetas (nombre_etiqueta ) VALUES ($1)  RETURNING *';
    const result=await db_client.query( query, [ nombre_etiqueta]
    )

    return result.rows[0];
}

async function Eliminar_etiqueta(id_etiqueta){

    const result=await db_client.query('DELETE FROM etiquetas WHERE id_etiqueta=$1 RETURNING nombre_etiqueta', [id_etiqueta]);
    
    if (result.rowCount === 0) {
        return undefined;
    }
    return result.rows[0].nombre_etiqueta;
}


module.exports = {
    Obtener_etiquetas,
    Obtener_etiqueta,
    Crear_etiqueta,
    Eliminar_etiqueta
};
