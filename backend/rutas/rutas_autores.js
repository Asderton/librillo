const express = require('express');
const router = express.Router();

const {
    get_all_autores,
    get_un_autor
} = require('../modelos/autores');


router.get ('/api/autores', async (req,res) => {
    const respuesta = await get_all_autores();
    res.json(respuesta);
});

router.get ('/api/autores/:id', async (req,res) => {
    const autor = await get_un_autor(req.params.id);
    res.json(autor);
});

module.exports = router;