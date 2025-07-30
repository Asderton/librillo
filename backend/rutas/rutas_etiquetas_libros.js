const express = require('express');
const router = express.Router();
const {
        Crear_etiqueta_libro,
        Eliminar_etiqueta_libro

} = require('../modelos/etiquetas_libros');

router.post('/api/libros/:isbn_code/etiquetas', async (req, res)=>{
    const isbn_code=req.params.isbn_code;

    if (!req.body.id_etiqueta  || !isbn_code ) {
        return res.status(400).json({error: 'Faltan campos obligatorios. Asegurate de enviar id_etiqueta,isbn_code.'});
    }
    if (!Number.isInteger(Number(req.body.id_etiqueta))) {
        return res.status(400).json({ error: 'id_etiqueta debe ser un número entero.' });
    }
    try{
        const etiqueta=await Crear_etiqueta_libro(
            req.body.id_etiqueta,
            isbn_code
        );
        return res.status(201).json({mensaje: 'etiqueta creada con éxito', etiqueta});

    }
    catch(error){
        console.log(error);
        if (error.code=='23505') {
            return res.status(409).json({ error: 'La etiqueta ya esta relacionada a ese libro.' });
        } 
        return res.status(500).json({ error: 'Error del servidor no se pudo crear la relacion de la etiqueta con el libro.' });  
    }    
});

router.delete('/api/libros/:isbn_code/etiquetas', async (req, res)=>{

    if (!req.body.id_etiqueta  || !req.params.isbn_code ) {
        return res.status(400).json({error: 'Faltan campos obligatorios. Asegurate de enviar id_etiqueta,isbn_code.'});
    }
    const isbn_code=req.params.isbn_code;
    const id_etiqueta=req.body.id_etiqueta;
    if (!Number.isInteger(Number(isbn_code)) && !Number.isInteger(Number(id_etiqueta) )) {
        return res.status(400).json({ error: 'isbn_code y el id_etiqueta deben ser  números enteros.' });
    }
    try {
        const etiqueta=await Eliminar_etiqueta_libro(id_etiqueta,isbn_code);
        console.log('eliminar', etiqueta);

        if(etiqueta===undefined){
            return res.status(404).json({error: 'La etiqueta a eliminar no esta relacionada al libro.'});
        }
        
        else{
            return res.status(201).json({mensaje: `La etiqueta numero ${etiqueta} ha sido eliminada con éxito del libro ${isbn_code}  .`});
        }
    }
    catch(error){
        return res.status(500).json({error: 'Error en el servidor al eliminar la etiqueta asociada al libro.'});
    }

});
module.exports=router;
