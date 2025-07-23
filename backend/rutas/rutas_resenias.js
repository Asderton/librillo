const express = require('express');
const router = express.Router();

const {
    Obtener_resenias

} = require('../modelos/resenias');


router.get('/api/libros/:isbn_code/resenias', async (req, res)=>{

    const isbn_code=Number(req.params.isbn_code);
    if(!Number.isInteger(isbn_code)){
        return res.status(400).json({error: 'isbn_code inválido, debe ser un número entero.'});
    }

    try{
        const resenia=await Obtener_resenias(req.params.isbn_code);
        if(resenia===undefined){
            return res.status(404).json({error: 'El libro no tine ninguna reseña'});
        }
        return res.status(200).json(resenia);
    }
    catch(error){
        
        return res.status(500).json({error:'Error del servidor al obtener las reseñas.'});
    }   
});


router.post('/api/resenias', async (req, res) => {
    const { nombre_usuario, isbn_code, calificacion, body } = req.body;
    
    if (!nombre_usuario || !isbn_code || calificacion === undefined ) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: nombre_usuario, isbn_code, calificacion' });
    }
    
    if (!Number.isInteger(Number(calificacion)) || calificacion < 0 || calificacion > 10) {
        return res.status(400).json({ error: 'calificacion debe ser un número entero entre 0 y 10.' });
    }
    
    try {
        const resenia = await Crear_resenia(nombre_usuario, isbn_code, calificacion, body|| null);
    if (!resenia) {
        return res.status(409).json({ error: 'La reseña ya existe.' });
    }
        return res.status(201).json({ mensaje: 'Reseña creada con éxito.' });
    } 
    catch (error) {
        return res.status(500).json({ error: 'Error del servidor al crear reseña.' });
    }
});
    
router.delete('/api/resenias/:nombre_usuario/:isbn_code', async (req, res) => {
    const { nombre_usuario, isbn_code } = req.params;
    
    try {
        const eliminado = await Eliminar_resenia(nombre_usuario, isbn_code);
    if (!eliminado) {
        return res.status(404).json({ error: 'La reseña no existe.' });
    }
    return res.status(200).json({ mensaje: `Reseña de ${eliminado} eliminada con éxito.` });
    } 
    catch (error) {
    return res.status(500).json({ error: 'Error del servidor al eliminar reseña.' });
    }
});
    
router.put('/api/resenias/:nombre_usuario/:isbn_code', async (req, res) => {
    const { nombre_usuario, isbn_code } = req.params;
    const { calificacion, body } = req.body;
    
    if (calificacion === undefined) {
        return res.status(400).json({ error: 'Falta campo obligatorio: calificacion.' });
    }
    
    if (!Number.isInteger(Number(calificacion)) || calificacion < 0 || calificacion > 10) {
        return res.status(400).json({ error: 'calificacion debe ser un número entero entre 0 y 10.' });
    }
    
    try {
        const actualizado = await Actualizar_resenia(nombre_usuario, isbn_code, calificacion, body || null);
    if (!actualizado) {
        return res.status(404).json({ error: 'La reseña no existe y no se puede actualizar.' });
    }
    return res.status(200).json({ mensaje: `Reseña de ${actualizado} actualizada con éxito.` });
    } 
    catch (error) {
        return res.status(500).json({ error: 'Error del servidor al actualizar reseña.' });
    }
});

module.exports=router;