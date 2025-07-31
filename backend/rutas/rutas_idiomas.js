const express = require('express');
const router = express.Router();

const { get_all_idiomas }= require('../modelos/modelos_idiomas.js');

// Ver seguidos
router.get ('/api/idiomas', async (req,res) => {
    try{
        const idiomas = await get_all_idiomas();
        if (idiomas === undefined){
            return res.status(404).json({error: "No se encontraron idiomas"});
        }
        return res.status(200).json(idiomas);
    }
    catch (error){
        console.log(error);
        return res.status(500).json({error: "Error del servidor al obtener idiomas"});
    }
});

module.exports = router;
