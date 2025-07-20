const express = require('express');
const router = express.Router();

const {
    Obtener_etiquetas,
    Obtener_etiqueta,
    Crear_etiqueta,
    Eliminar_etiqueta

} = require('../modelos/etiquetas');

router.get('/api/etiquetas', async (req, res)=>{
    try{
        const etiquetas=await Obtener_etiquetas();
        res.status(200).json(etiquetas);
    }
    catch(error){
        res.status(500).json({error:'Error del servidor al obtener las etiquetas.'});
    }  
});

router.get('/api/etiquetas/:id_etiqueta', async (req, res)=>{

    if (!Number.isInteger(Number(req.params.id_etiqueta))) {
        return res.status(400).json({ error: 'isbn_code debe ser un número entero.' });
    }

    try{
        const etiqueta=await Obtener_etiqueta(req.params.isbn_code);
        if(etiqueta===undefined){
            return res.status(404).json({error: 'etiqueta no encontrada'});
        }
        res.status(200).json(etiqueta);
    }
    catch(error){
        res.status(500).json({error:'Error del servidor al obtener la etiqueta.'});
    }   
});

router.post('/api/etiqueta', async (req, res)=>{

    if (!req.body.id_etiqueta  || !req.body.nombre_etiqueta ) {
        return res.status(400).json({error: 'Faltan campos obligatorios. Asegurate de enviar id_etiqueta, nombre_etiqueta.'});
    }
    if (!Number.isInteger(Number(req.body.id_etiqueta))) {
        return res.status(400).json({ error: 'id_etiqueta debe ser un número entero.' });
        }
    if (typeof  req.body.nombre_etiqueta!== 'string' || req.body.nombre_etiqueta.trim() === '') {
        return res.status(400).json({ error: 'nombre etiqueta debe ser un texto no vacío.' });
    }

    try{
        
        const etiqueta=await Crear_etiqueta(
            req.body.id_etiqueta ,
            req.body.nombre_etiqueta
        );

        if (libro === undefined) {
            return res.status(409).json({ error: 'La etiqueta que intentas crear ya existe'});
        };
        return res.status(201).json({mensaje: `Etiqueta ${etiqueta} creado con éxito`});
    }
    catch(error){
        return res.status(500).json({error: 'Error del servidor no se pudo crear el libro'});
    };   
});


router.delete('/api/libros/:id_etiqueta', async (req, res)=>{

    if (!Number.isInteger(Number(req.params.id_etiqueta))) {
        return res.status(400).json({ error: 'id_etiqueta debe ser un número entero.' });
        }
    try {
        const etiqueta=await Eliminar_etiqueta(req.params.id_etiqueta);
        if(etiqueta===undefined){
            return res.status(404).json({error: 'La etiqueta que intentas eliminar no existe'});
        }

        return res.status(201).json({mensaje: 'La etiqueta ${etiqueta} ha sido eliminada con éxito.'});

    }catch(error){
        return res.status(500).json({error: 'Error en el servidor al eliminar la etiqueta.'});
    }

});
    
module.exports=router;


