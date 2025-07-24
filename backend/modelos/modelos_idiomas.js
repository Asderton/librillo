const db_client = require('./funciones_db');

async function get_all_idiomas() {
    const idiomas = await db_client.query(`SELECT * FROM idiomas`);
    if (idiomas.rowCount === 0){
        return undefined;
    }
    return idiomas.rows;
}

module.exports = {get_all_idiomas};