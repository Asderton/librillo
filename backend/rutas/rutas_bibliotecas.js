const express = require('express');
const router = express.Router();
const { middleware_jwt } = require('../middleware.js');

const {
    get_bibliotecas_username, 
    get_libros_biblioteca, 
    crear_biblioteca, 
    agregar_libro_biblioteca, 
    eliminar_biblioteca, 
    eliminar_libro_biblioteca, 
    modificar_biblioteca
} = require('../modelos/modelos_bibliotecas.js');

const {validar_request_biblioteca} = require('../validaciones/validaciones_bibliotecas.js');


// Get id,icono y nombre de las bibliotecas del usuario 
router.get ('/api/bibliotecas/', middleware_jwt, async (req,res) => {
    const username = req.auth.username;
    try{
        const bibliotecas = await get_bibliotecas_username(username);
        if (bibliotecas === undefined){
            return res.status(404).json({error: "Bibliotecas no encontradas"});
        }
        res.status(200).json(bibliotecas);
    }
    catch(error){
        return res.status(500).json({error: `Error del servidor al obtener las bibliotecas de ${username}.`});
    };
});


// Get codigo, iconos e imagenes de los libros en una biblioteca
router.get ('/api/bibliotecas/:id', async (req,res) => {
    const id_biblioteca = req.params.id;
    try{
        const libros = await get_libros_biblioteca(id_biblioteca);
        if (libros === undefined){
            return res.status(404).json({error: "Biblioteca no encontrada"})
        }
        res.status(200).json(libros);
    }
    catch(error){
        return res.status(500).json({error: "Error del servidor al obtener los libros de la biblioteca."});
    };
});

// Crear una biblioteca vacia
router.post ('/api/bibliotecas', middleware_jwt, async (req,res) => { 
    const username_cliente = req.auth.username;
    const validacion = validar_request_biblioteca(req.body);
    if(!validacion.resultado){
        return res.status(validacion.status).json({ error: validacion.mensaje});
    };
    const { nombre_biblioteca, icono } = req.body;

    try{
        const biblioteca_creada = await crear_biblioteca(username_cliente, nombre_biblioteca, icono); //deberia lidiar con foreign key inexistente?
        if (biblioteca_creada === undefined){
            return res.status(400).json({error: "Biblioteca ya existe"});//nunca pasaria
        }
        return res.status(200).json({mensaje: `Biblioteca "${nombre_biblioteca}" creada con exito`});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Error del servidor al crear la biblioteca"});
    };
});

//Agregar libro a biblioteca
router.post ('/api/bibliotecas/:id', middleware_jwt, async (req,res) => { 
    const username_cliente = req.auth.username;
    const id_biblioteca = req.params.id;
    const { isbn_code } = req.body;
    if (!Number.isInteger(Number(isbn_code))){
        return res.status(400).json({error: "El codigo ISBN debe ser un numero"});
    }

    try{
        const relacion = await agregar_libro_biblioteca(username_cliente, id_biblioteca, isbn_code);
        if (relacion.status !== undefined ){
            return res.status(relacion.status).json({error: relacion.error});
        }
        return res.status(200).json({mensaje: "Libro agregado a biblioteca"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:"Error del servidor al agregar libro."});
    };
});

// Eliminar biblioteca
router.delete ('/api/bibliotecas/:id', middleware_jwt, async (req,res) => {
    const username_cliente = req.auth.username;
    const id_biblioteca = req.params.id;
    try{
        const biblioteca_eliminada = await eliminar_biblioteca(username_cliente, id_biblioteca);
        if (biblioteca_eliminada === undefined){
            return res.status(404).json({error: "La biblioteca que desea eliminar no esta disponible o no existe!"})
        };
        if (biblioteca_eliminada.status !== undefined){
            return res.status(biblioteca_eliminada.status).json({error: biblioteca_eliminada.error});
        }
        return res.status(200).json({mensaje: `${biblioteca_eliminada} eliminada con exito`});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: `Error del servidor al eliminar la biblioteca`});
    };
});

// Eliminar libro de biblioteca
router.delete ('/api/bibliotecas/:id/libros/:isbn_code', async (req,res) => {
    const username_cliente = req.auth.username;
    const id_biblioteca = req.params.id;
    const isbn_code = req.params.isbn_code;
    try{
        const libro_eliminado = await eliminar_libro_biblioteca(username_cliente, id_biblioteca, isbn_code);
        if (libro_eliminado === undefined){
            return res.status(404).json({error: "El libro que desea eliminar no esta en la biblioteca!"})
        }
        if (libro_eliminado.status !== undefined){
            return res.status(libro_eliminado.status).json({error: libro_eliminado.error});
        }
        return res.status(200).json({mensaje: `${libro_eliminado} eliminado con exito de la biblioteca`});
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Error del servidor al eliminar el libro"});
    };
});

// Modificar nombre o icono de biblioteca
router.put ('/api/bibliotecas/:id', async (req,res) => {
    const username_cliente = req.auth.username;
    const id_biblioteca = req.params.id;
    const validacion = validar_request_biblioteca(req.body);
    if(!validacion.resultado){
        return res.status(validacion.status).json({ error: validacion.mensaje});
    };
    const {
        nombre_biblioteca,
        icono,
    } = req.body;

    try{
        const biblioteca = await modificar_biblioteca(username_cliente, id_biblioteca, nombre_biblioteca, icono);
        if (biblioteca === undefined){
            return res.status(404).json({error: "La biblioteca que desea modificar no esta disponible o no exise"});
        }
        if (biblioteca.status !== undefined){
            return res.status(biblioteca.status).json({error: biblioteca.error});
        }
        return res.status(200).json({mensaje: `Biblioteca ${nombre_biblioteca}" actualizada con exito`});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:'Error del servidor al modificar biblioteca.'});
    };
});

module.exports = router;