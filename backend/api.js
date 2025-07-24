const express = require ("express");
const app =express();
const port=3000;

const router_autores = require('./rutas/rutas_autores.js');
const router_libros=require('./rutas/rutas_libros.js');
const router_etiquetas=require('./rutas/rutas_etiquetas.js');
const router_etiquetas_libros=require('./rutas/rutas_etiquetas_libros.js');
const router_resenias=require('./rutas/rutas_resenias.js');



app.use(express.json());

app.get( '/', (req,res)=>{ res.send ('hola mundo');
});


app.use(router_autores);
app.use(router_libros);
app.use(router_etiquetas);
app.use(router_etiquetas_libros);
app.use(router_resenias);



app.listen(port, () =>{
console.log (`servidor escuchando en el puerto: ${port}`);
});
