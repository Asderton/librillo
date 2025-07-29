const express = require('express');
const router = express.Router();

const {
    Obtener_libro,
    Obtener_libros,
    Crear_libro,
    Eliminar_libro,
    Actualizar_libro
} = require('../modelos/modelos_libros');

const {asignar_autor_a_libro} = require('../modelos/modelos_autores_libros');

router.get('/api/libros', async (req, res)=>{
    try{
        const libros=await Obtener_libros();
        res.status(200).json(libros);
    }catch(error){
        console.log(error)
        res.status(500).json({error:'Error del servidor al obtener los libros.'});
    }  
});

router.get('/api/libros/:isbn_code', async (req, res)=>{

    const isbn_code=Number(req.params.isbn_code);
    if(!Number.isInteger(isbn_code)){
        return res.status(400).json({error: 'isbn_code inválido, debe ser un número entero.'});
    }

    try{
        const libro=await Obtener_libro(isbn_code);
        if(libro===undefined){
            return res.status(404).json({error: 'Libro no encontrado'});
        }
        return res.status(200).json(libro);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:'Error del servidor al obtener el libro.'});
    }   
});


router.post('/api/libros', async (req, res)=>{
    const {
        isbn_code,
        titulo,
        id_autor,
        descripcion,
        fecha_publicacion,
        numero_de_paginas,
        imagen_portada,
        idioma_id
        } = req.body;

    if (!isbn_code || !titulo || !descripcion || !numero_de_paginas || !idioma_id) {
        return res.status(400).json({
        error: 'Faltan campos obligatorios. Asegurate de enviar isbn_code, titulo, descripcion, numero_de_paginas e idioma_id.'
        });
    }
    
    if (!Number.isInteger(Number(isbn_code))) {
        return res.status(400).json({ error: 'isbn_code debe ser un número entero.' });
    }

    if (typeof titulo !== 'string' || titulo.trim() === '') {
    return res.status(400).json({ error: 'titulo debe ser un texto no vacío.' });
    }

    if (fecha_publicacion && isNaN(Date.parse(fecha_publicacion))) {
    return res.status(400).json({ error: 'fecha_publicacion debe tener formato de fecha válido (año-mes-dia).' });
    }
    
    if (typeof descripcion !== 'string' || descripcion.trim() === '') {
    return res.status(400).json({ error: 'descripcion debe ser un texto no vacío.' });
    }
    
    if (!Number.isInteger(Number(numero_de_paginas)) || Number(numero_de_paginas) <= 0) {
    return res.status(400).json({ error: 'numero_de_paginas debe ser un número entero positivo.' });
    }
    
    if (imagen_portada && typeof imagen_portada !== 'string') {
    return res.status(400).json({ error: 'imagen_portada debe ser una cadena de texto (URL).' });
    }
    
    if (!Number.isInteger(Number(idioma_id)) || Number(idioma_id) < 0) {
    return res.status(400).json({ error: 'idioma_id debe ser un número entero.' });
    }
 
    try{
        const libro=await Crear_libro(
            isbn_code,
            titulo,
            descripcion,
            fecha_publicacion ||null,
            numero_de_paginas,
            imagen_portada ||null,
            idioma_id
        );
        if (libro === undefined) {
            return res.status(409).json({ error: 'El libro que intentas crear ya existe'});
        };

        if (id_autor){
            const resultado = await asignar_autor_a_libro(isbn_code, id_autor);
            if(resultado.status){
                return res.status(resultado.status).json({error: resultado.error});
            }
        }
            return res.status(201).json({mensaje: `Libro ${titulo} creado con éxito`});
    }

    catch(error){
        console.log(error);
        return res.status(500).json({error: 'Error del servidor no se pudo crear el libro'});
    };
    
});

router.delete('/api/libros/:isbn_code', async (req, res)=>{
    if (!Number.isInteger(Number(req.params.isbn_code))) {
        return res.status(400).json({ error: 'isbn_code debe ser un número entero.' });
        }
    try {
        const libro=await Eliminar_libro(req.params.isbn_code);
        if(libro===undefined){
            return res.status(404).json({error: 'El libro que intentas eliminar no existe'});
        }
        else{
            return res.status(201).json({mensaje: 'El libro ${libro} ha sido eliminado con éxito.'});
        }
    }
    catch(error){
        return res.status(500).json({error: 'Error en el servidor al eliminar el libro'});
    }

});

router.put('/api/libros/:isbn_code', async (req, res)=> {
    if (!Number.isInteger(Number(req.params.isbn_code))) {
        return res.status(400).json({ error: 'isbn_code debe ser un número entero.' });
    }
    const isbn_code = req.params.isbn_code;
    
    const {
        titulo,
        descripcion,
        fecha_publicacion,
        numero_de_paginas,
        imagen_portada,
        idioma_id
        } = req.body;

    if (typeof titulo !== 'string' || titulo.trim() === '') {
        return res.status(400).json({ error: 'titulo debe ser un texto no vacío.' });
    }
    if (fecha_publicacion && isNaN(Date.parse(fecha_publicacion))) {
    return res.status(400).json({ error: 'fecha_publicacion debe tener formato de fecha válido (año-mes-dia).' });
    }
    
    if (typeof descripcion !== 'string' || descripcion.trim() === '') {
    return res.status(400).json({ error: 'descripcion debe ser un texto no vacío.' });
    }
    
    if (!Number.isInteger(Number(numero_de_paginas)) || Number(numero_de_paginas) <= 0) {
    return res.status(400).json({ error: 'numero_de_paginas debe ser un número entero positivo.' });
    }
    
    if (imagen_portada && typeof imagen_portada !== 'string') {
    return res.status(400).json({ error: 'imagen_portada debe ser una cadena de texto (URL).' });
    }
    
    try{
        const libro = await Actualizar_libro(
            isbn_code,
            titulo,
            descripcion,
            fecha_publicacion,
            numero_de_paginas,
            imagen_portada,
            idioma_id
        );
        if(libro === undefined){
            return res.status(404).json({mensaje: "El libro no existe"});
        }
        return res.status(201).json({mensaje: `Libro ${libro} actualizado con éxito`});
    }
    catch(error){
        console.log(error);
        res.status(500).send('Error del servidor, no se pudieron modificar los datos');
    };

});

module.exports=router;
