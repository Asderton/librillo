const express = require ("express");
const app =express();
const port=3000;
const router_autores = require('./rutas/rutas_autores.js');
const router_usuarios = require('./rutas/rutas_usuarios.js');
// const pool = require('./db');

app.use(express.json());

app.get( '/', (req,res)=>{ res.send ('hola mundo');
});

app.use(router_autores);
app.use(router_usuarios);

app.listen(port, () =>{
    console.log (`servidor escuchando en el puerto: ${port}`);
});
