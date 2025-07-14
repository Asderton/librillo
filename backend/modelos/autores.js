const db_client = require('./funciones_db');


async function get_all_autores() {
    const result = await db_client.query('SELECT * FROM autores');
    return (result.rows);
};

async function get_un_autor(id_autor) {
    const result = await db_client.query(`SELECT * FROM autores WHERE id_autor = ${id_autor}`)
    return (result.rows[0]);
};


module.exports = {
    get_all_autores,
    get_un_autor
};

// async function get_one_author(id) {
    
//     const result = await db_client.query('SELECT * FROM autores WHERE id_autor=$1', [id]);
//     return result.rows[0];
// }


// module.exports = {
//     get_all_authors,
//     get_one_author
// };
