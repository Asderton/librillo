const express = require('express');
const router = express.Router();

const {asignar_autor_a_libro} = require('../modelos/modelos_autores_libros');

// Ver todos los autores
router.post ('/api/autores_libros', async (req,res) => {
    const {
        isbn_code,
        id_autor
    } = req.body

    if (!isbn_code || !id_autor){
        return res.status(400).json({error: 'Campos obligatorios faltantes'});
    }

    try{
        const resultado = await asignar_autor_a_libro(isbn_code, id_autor);
        if(resultado.status){
            return res.status(resultado.status).json({error: resultado.error});
        }
        return res.status(200).json({mensaje: "Libro asignado a autor con exito"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:"Error del servidor."});
    };
});

module.exports = router;