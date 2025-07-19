const { Pool } = require('pg');
const dbclient = new Pool({
user: 'postgres',       
host: 'localhost',      
database: 'librillo',  
password: 'postgres',   
port: 5432,             
});


module.exports = dbclient;