const express = require ("express");
const app =express();
const port=3000;
const cors = require('cors');
const { middleware_error } = require("./middleware.js");

const router_paises = require('./rutas/rutas_paises.js');
const router_autores = require('./rutas/rutas_autores.js');
const router_usuarios = require('./rutas/rutas_usuarios.js');
const router_login = require('./rutas/rutas_login.js');
const router_seguidos = require('./rutas/rutas_seguidos.js');
const router_bibliotecas = require('./rutas/rutas_bibliotecas.js');
const router_libros=require('./rutas/rutas_libros.js');
const router_etiquetas=require('./rutas/rutas_etiquetas.js');
const router_etiquetas_libros=require('./rutas/rutas_etiquetas_libros.js');
const router_idiomas = require('./rutas/rutas_idiomas.js');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(router_paises);
app.use(router_login);
app.use(router_autores);
app.use(router_seguidos);
app.use(router_usuarios);
app.use(router_bibliotecas);
app.use(router_libros);
app.use(router_etiquetas);
app.use(router_etiquetas_libros);
app.use(router_idiomas);
app.use(middleware_error);

app.listen(port, () =>{
console.log (`servidor escuchando en el puerto: ${port}`);
});
