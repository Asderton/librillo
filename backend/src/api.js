const express = require ("express");
const app =express();
const port=3000;
const pool = require('./funciones_db'); 

const {
    Obtener_libros,
    Obtener_libro,
    Eliminar_libro,
    Actualizar_libro
}=require('./funciones_db.js');

//vemos si el servidor esta levantado
app.get( '/', (req,res)=>{ res.send ('hola mundo');
});
//cosas que faltan: endpoint para actualizar un libro, verificación de autenticación en crear y elimnar libro
//funciones basicas de la entidad libros
app.get('/api/libros', async (req, res)=>{
    try{
        const libros=await Obtener_libros();
        res.status(200).json(libros);
    }catch(error){
        res.status(500).json({error:'Error del servidor al obtener los libros.'});
    }  
});
/////obtener un libro
app.get('/api/libros/:isbn_code', async (req, res)=>{

    const isbn_code=Number(req.params.isbn_code);
    if(!Number.isInteger(isbn_code)){
        return res.status(400).json({error: 'isbn_code inválido, debe ser un número entero.'});
    }

    try{
        const libro=await Obtener_libro(req.params.isbn_code);
        if(libro===undefined){
            return res.status(404).json({error: 'Libro no encontrado'});
        }
        res.status(200).json(libro);
    }catch(error){
        res.status(500).json({error:'Error del servidor al obtener el libro.'});
    }   
});

//crear libro
app.post('/api/libros', async (req, res)=>{
    const {
        isbn_code,
        titulo,
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
    //validar los daatos del body:
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

    //////fin de las validadciones de datos
    try{
        if ((await Obtener_libro(isbn_code))!==undefined){
            return res.status(409).json({
            error: 'El libro que intentas crear ya existe'
            });
        }
        
        const libro=await Crear_libro(
            isbn_code,
            titulo,
            descripcion,
            fecha_publicacion ||null,
            numero_de_paginas,
            imagen_portada ||null,
            idioma_id
        );
        if (!libro) {
            return res.status(500).json({ error: 'Error del servidor no se pudo crear el libro' });
        } 
        res.status(201).json({mensaje: 'Libro creado con éxito', libro});

    }catch(error){
        return res.status(500).json({ error: 'Error del servidor no se pudo crear el libro' });  
    }    
});
//eliminar libro
app.delete('/api/libros/:isbn_code', async (req, res)=>{
    if (!Number.isInteger(Number(req.params.isbn_code))) {
        return res.status(400).json({ error: 'isbn_code debe ser un número entero.' });
        }
    try {
        const libro=await Eliminar_libro(req.params.isbn_code);
        if(libro===undefined){
            return res.status(404).json({error: 'El libro que intentas eliminar no existe'});
        }

        res.json({status: 'OK', isbn_code: libro});

    }catch(error){
        return res.status(500).json({error: 'Error en el servidor al eliminar el libro'});
    }

});
//actuallizar libro
app.put('/api/libros/:isbn_code', async (req, res)=> {


    const existe_libro=await Obtener_libro(req.params.isbn_code);
    if(existe_libro===undefined){
        return res.status(404).json({error: 'El libro que intentas actualizar no existe'});
    }
    const result=await Actualizar_libro(req.params.isbn_code);

});

//////////////////////////////////////////////etiquetas
//ver las etiquetas disponibles
app.get('/api/etiquetas', async (req, res)=>{
    try{
        const etiquetas=await Obtener_etiquetas();
        res.status(200).json(etiquetas);
    }catch(error){
        res.status(500).json({error:'Error del servidor al obtener las etiquetas.'});
    }  
});
///crar una etiqueta
app.post('/api/etiqueta', async (req, res)=>{

    if (!req.body.id_etiqueta  || !req.body.nombre_etiqueta ) {
        return res.status(400).json({
        error: 'Faltan campos obligatorios. Asegurate de enviar id_etiqueta, nombre_etiqueta.'
        });
    }
    //validar los daatos del body:
    if (!Number.isInteger(Number(req.body.id_etiqueta))) {
        return res.status(400).json({ error: 'id_etiqueta debe ser un número entero.' });
        }
    if (typeof  req.body.nombre_etiqueta!== 'string' || req.body.nombre_etiqueta.trim() === '') {
    return res.status(400).json({ error: 'nombre etiqueta debe ser un texto no vacío.' });
    }
    try{
        if ((await Obtener_etiqueta(isbn_code))!==undefined){
            return res.status(409).json({
            error: 'La etiqueta que intentas crear ya existe'
            });
        }
        
        const etiqueta=await Crear_etiqueta(
            req.body.id_etiqueta ,
            req.body.nombre_etiqueta
        );
        if (!etiqueta) {
            return res.status(500).json({ error: 'Error del servidor no se pudo crear la etiqueta' });
        } 
        res.status(201).json({mensaje: 'etiqueta creada con éxito', etiqueta});

    }catch(error){
        return res.status(500).json({ error: 'Error del servidor no se pudo crear la etiqueta.' });  
    }    
});

/////eliminar etiqueta:
app.delete('/api/libros/:id_etiqueta', async (req, res)=>{

    if (!Number.isInteger(Number(req.params.id_etiqueta))) {
        return res.status(400).json({ error: 'id_etiqueta debe ser un número entero.' });
        }
    try {
        const etiqueta=await Eliminar_etiqueta(req.params.id_etiqueta);
        if(etiqueta===undefined){
            return res.status(404).json({error: 'La etiqueta que intentas eliminar no existe'});
        }

        res.json({status: 'OK', isbn_code: etiqueta});

    }catch(error){
        return res.status(500).json({error: 'Error en el servidor al eliminar la etiqueta.'});
    }

});
    

app.put('/api/libros/:id', async (req, res) => {

    if (!req.body.isbn_code || !req.body.titulo || !req.body.descripcion || !req.body.numero_de_paginas || !req.body.idioma_id) {
        return res.status(400).json({
        error: 'Faltan campos obligatorios. Asegurate de enviar isbn_code, titulo, descripcion, numero_de_paginas e idioma_id.'
        });
    }

    let libro=await Obtener_libro(req.params.isbn_code);
    if(libro===undefined){
        return res.status(404).json({error: 'El libro que intentas actualizar no existe'});
    }
    
    libro=await Actualizar_libro(
        req.params.isbn_code,
        req.body.titulo,
        req.body.descripcion,
        req.body.numero_de_paginas,
        req.body.imagen_portada,
        req.body.idioma_id,
    );
    if (!libro) {
        return res.status(500).json({ error: 'Error del servidor no se pudo actualizar el libro' });
    }  
    res.status(200).json({ ok: 'Libro actualizado con éxito', libro: result.rows[0] });
});   
///
app.listen(port, () =>{
    console.log (`servidor escuchando : ${port}`);
});

