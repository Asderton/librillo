
const { Pool } = require('pg');

const db_client = new Pool({
    host: 'librillo_db', 
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'librillo',
    });

db_client.connect()
.then(() => console.log(" Conexión a PostgreSQL exitosa"))
.catch(err => console.error(" Error al conectar a PostgreSQL:", err));

module.exports = db_client;
