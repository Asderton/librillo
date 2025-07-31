require('dotenv').config();

const { Pool } = require('pg');

const db_client = new Pool({
    connectionString: process.env.DATABASE_URL,
});

db_client.connect()
    .then(() => console.log("Conexión a PostgreSQL en Supabase exitosa"))
    .catch(err => console.error("Error al conectar a PostgreSQL en Supabase:", err));

module.exports = db_client;

