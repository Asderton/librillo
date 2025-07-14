const express = require ("express");
const app =express();
const port=3000;
const router_autores = require('./rutas/rutas_autores.js');
// const pool = require('./db');

const { get_all_autores, get_un_autor} = require('./modelos/autores.js');

app.get( '/', (req,res)=>{ res.send ('hola mundo');
});

app.use(router_autores);

app.listen(port, () =>{
    console.log (`servidor escuchando en el puerto: ${port}`);
});
