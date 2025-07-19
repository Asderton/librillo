const express = require('express');
const router = express.Router();
const {
        Crear_etiquetas_libros

} = require('../modelos/etiquetas_libros');

router.post('/api/etiquetas', async (req, res)=>{

    if (!req.body.id_etiqueta  || !req.body.isbn_code ) {
        return res.status(400).json({error: 'Faltan campos obligatorios. Asegurate de enviar id_etiqueta,isbn_code.'});
    }
    if (!Number.isInteger(Number(req.body.id_etiqueta))) {
        return res.status(400).json({ error: 'id_etiqueta debe ser un número entero.' });
        }


    try{
        const etiqueta=await Crear_etiquetas_libros(
            req.body.id_etiqueta ,
            req.body.nombre_etiqueta
        );
        if (!etiqueta) {
            return res.status(409).json({ error: 'La etiqueta que intentas crear ya existe' });
        } 
        return res.status(201).json({mensaje: 'etiqueta creada con éxito', etiqueta});

    }
    catch(error){
        return res.status(500).json({ error: 'Error del servidor no se pudo crear la etiqueta.' });  
    }    
});
module.exports=router;