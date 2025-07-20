const express = require('express');
const router = express.Router();

const {
    get_all_seguidos,
    get_all_seguidores
}= require('../modelos/modelos_seguidos.js');

// Ver seguidos
router.get ('/api/:username/seguidos', async (req,res) => {
    const username = req.params.username;
    try{
        const seguidos = await get_all_seguidos(username);
        if (seguidos ===  null){
           return res.status(200).json({mensaje: "No tienes seguidos"});
        }
        res.status(200).json(seguidos);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Error del servidor al obtener los seguidos.'});
    };
});

// Ver seguidores
router.get ('/api/:username/seguidores', async (req,res) => {
    const username = req.params.username;
    try{
        const seguidores = await get_all_seguidores(username);
        if (seguidores ===  null){
           return res.status(200).json({mensaje: "No tienes seguidores"});
        }
        res.status(200).json(seguidores);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Error del servidor al obtener los seguidores.'});
    };
});



module.exports = router;