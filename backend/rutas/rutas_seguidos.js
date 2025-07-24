const express = require('express');
const router = express.Router();
const { middleware_jwt } = require('../middleware.js');

const {
    get_all_seguidos,
    get_all_seguidores,
    crear_seguidor,
    eliminar_seguidor
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

// Seguir
router.post ('/api/seguidos/:username', middleware_jwt, async (req,res) =>{ 
    const usuario_cliente = req.auth.username;
    const usuario_a_seguir = req.params.username;

    const result = await crear_seguidor(usuario_cliente, usuario_a_seguir);
    //validar que el seguimiento se haya producido
    if (result === undefined){
        return res.status(404).json({error: "El usuario al que quieres seguir no existe o no esta disponible"});
    }
    //returnear ahora sigues a tal
    return res.status(200).send(`Ahora sigues a ${usuario_a_seguir}`);
})

// Dejar de seguir
router.delete ('/api/seguidos/:username', middleware_jwt, async (req, res) => {
    const usuario_a_unfollow = req.params.username;
    const usuario_cliente = req.auth.username;

    const usuario_eliminado = await eliminar_seguidor(usuario_cliente, usuario_a_unfollow);
    if (usuario_eliminado === undefined){
        return res.status(404).send(`No sigues a ${usuario_a_unfollow}`);
    }
    return res.status(200).send(`Ya no sigues a ${usuario_a_unfollow}`);
})


module.exports = router;