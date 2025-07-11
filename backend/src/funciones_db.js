const { Pool } = require('pg');
const db_client = new Pool({
user: 'postgres',       
host: 'localhost',      
database: 'librillo',  
password: 'postgres',   
port: 5432,             
});
module.exports = pool;
