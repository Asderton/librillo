const db_client = require('./funciones_db');

async function get_all_paises() {
    const paises = await db_client.query("SELECT * FROM paises");
    if (paises.rowCount === 0){
        return undefined;
    }
    return paises.rows;
}

async function crear_pais(nombre_pais) {
    const pais_creado = await db_client.query("INSERT INTO paises (nombre_pais) VALUES ($1)", [nombre_pais]);
    return;
}

async function eliminar_pais(id_pais) {
    const pais_eliminado = await db_client.query("DELETE FROM paises WHERE id_pais = $1 RETURNING nombre_pais", [id_pais]);
    if (pais_eliminado.rowCount === 0){
        return undefined;
    }
    return pais_eliminado.rows[0].nombre_pais; 
}

module.exports = {get_all_paises, crear_pais, eliminar_pais};