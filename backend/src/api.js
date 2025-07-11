const express = require ("express");
const app =express();
const port=3000;
// const pool = require('./db');

app.get( '/', (req,res)=>{ res.send ('hola mundo');
});



app.listen(port, () =>{
    console.log (`servidor escuchando en el puerto: ${port}`);
});
