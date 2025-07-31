const express = require('express');
const router = express.Router();

const {
    Obtener_resenias,
    Crear_resenia,
    Eliminar_resenia,
    Actualizar_resenia

} = require('../modelos/resenias');


router.get('/api/libros/:isbn_code/resenias', async (req, res)=>{

    const isbn_code=Number(req.params.isbn_code);
    if(!Number.isInteger(isbn_code)){
        return res.status(400).json({error: 'isbn_code inválido, debe ser un número entero.'});
    }

    try{
        const resenia=await Obtener_resenias(isbn_code);
        if(resenia===undefined){
            return res.status(404).json({error: 'El libro no tine ninguna reseña'});
        }
        return res.status(200).json(resenia);
    }
    catch(error){
        
        return res.status(500).json({error:'Error del servidor al obtener las reseñas.'});
    }   
});


router.post('/api/resenias', async (req, res) => {//cambiar ruta
    const { nombre_usuario, isbn_code, calificacion, body } = req.body;
    
    if (!nombre_usuario || !isbn_code || calificacion === undefined ) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: nombre_usuario, isbn_code, calificacion' });
    }
    if(!Number.isInteger(isbn_code)){
        return res.status(400).json({error: 'isbn_code inválido, debe ser un número entero.'});
    }
    if (typeof nombre_usuario !== 'string' || nombre_usuario.trim() === '') {
        return res.status(400).json({ error: 'nombre_usuario debe ser un texto no vacío.' });
    }
    
    if (!Number.isInteger(Number(calificacion)) || calificacion < 0 || calificacion > 10) {
        return res.status(400).json({ error: 'calificacion debe ser un número entero entre 0 y 10.' });
    }
    
    try {
        const resenia = await Crear_resenia(nombre_usuario, isbn_code, calificacion, body|| null);
        return res.status(201).json({ mensaje: 'Reseña creada con éxito.' });
    } 
    catch (error) {
        if (error.code==='23505') {
            return res.status(409).json({ error: 'La reseña ya existe.' });
        }
        return res.status(500).json({ error: 'Error del servidor al crear reseña.' });
    }
});
    
router.delete('/api/libros/:isbn_code/resenias', async (req, res) => {
    const isbn_code = req.params.isbn_code;
    const nombre_usuario=req.body.nombre_usuario;
    if (!nombre_usuario || !isbn_code ) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: nombre_usuario, isbn_code.' });
    }
    if(!Number.isInteger(Number(isbn_code))){
        return res.status(400).json({error: 'isbn_code inválido, debe ser un número entero.'});
    }
    if (typeof nombre_usuario !== 'string' || nombre_usuario.trim() === '') {
        return res.status(400).json({ error: 'nombre_usuario debe ser un texto no vacío.' });
    }
    
    try {
        const resenia = await Eliminar_resenia(nombre_usuario, isbn_code);
    if (resenia==undefined) {
        return res.status(404).json({ error: 'La reseña no existe.' });
    }
    return res.status(200).json({ mensaje: `Reseña de ${resenia} eliminada con éxito.` });
    } 
    catch (error) {
        return res.status(500).json({ error: 'Error del servidor al eliminar reseña.' });
    }
});
    
router.put('/api/libros/:isbn_code/resenias', async (req, res) => {
    const isbn_code = req.params.isbn_code;
    const { nombre_usuario,calificacion, body } = req.body;
    
    if (calificacion === undefined) {
        return res.status(400).json({ error: 'Falta campo obligatorio: calificacion.' });
    }
    
    if (!Number.isInteger(Number(calificacion)) || calificacion < 0 || calificacion > 10) {
        return res.status(400).json({ error: 'calificacion debe ser un número entero entre 0 y 10.' });
    }
    
    try {
        const resenia = await Actualizar_resenia(nombre_usuario, isbn_code, calificacion, body || null);
    if (resenia===undefined) {
        return res.status(404).json({ error: 'La reseña no existe y no se puede actualizar.' });
    }
    return res.status(200).json({ mensaje: `Reseña de ${resenia} actualizada con éxito.` });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error del servidor al actualizar reseña.' });
    }
});

module.exports=router;