const dbclient = require('./funciones_db'); 

async function Obtener_etiquetas() {
    const result= await dbclient.query('SELECT * FROM etiquetas');
    return result.rows;
}

async function Obtener_etiqueta(id_etiqueta) {
    const result= await dbclient.query('SELECT * FROM etiquetas WHERE id_etiqueta=$1', [id_etiqueta]);
    if (result.rowCount===0){ 
        return undefined;
    }
    return result.rows[0];
}

async function Crear_etiqueta(
    id_etiqueta,
    nombre_etiqueta
) {
    
    const result=await dbclient.query(
        'INSERT INTO etiqueta (id_etiqueta, nombre_etiqueta ) VALUES ($1, $2)  RETURNING *' , 
        [id_etiqueta, nombre_etiqueta]
    )
    if (result.rowCount === 0) {
        return undefined;
        }
    return result.rows[0];
}

async function Eliminar_etiqueta(i){

    const result=await dbclient.query('DELETE FROM etiqueta WHERE id_etiqueta=$1 RETURNING nombre_etiqueta', [id_etiqueta]);
    
    if (result.rowCount === 0) {
        return undefined;
    }
    result.rows[0].nombre_etiqueta;
}


module.exports = {
    Obtener_etiquetas,
    Obtener_etiqueta,
    Crear_etiqueta,
    Eliminar_etiqueta
};