const express = require('express');
const router = express.Router();

const { get_all_paises, crear_pais, eliminar_pais } = require('../modelos/modelos_paises.js');
const { validar_crear_pais } = require('../validaciones/validaciones_paises.js');

router.get('/api/paises', async (req, res) => {
    try { 
    const paises = await get_all_paises();
        if (paises ===  null){
            return res.status(404).json({error: "Paises no encontrados"});
        }
        return res.send(paises);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({error: "Error del servidor al obtener los paises"});
    }
});

router.post('/api/paises', async (req, res) => {
    const { nombre_pais } = req.body;
    console.log(typeof nombre_pais);
    const validacion = validar_crear_pais(nombre_pais);
    if (validacion.status !== undefined){
        return res.status(validacion.status).json({error: validacion.error});
    };
    try{
        const pais = await crear_pais(nombre_pais);
        return res.status(200).json({mensaje: `Pais ${nombre_pais} creado con exito`});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({error: "Error del servidor al crear el pais"});
    }
});

router.delete('/api/paises/:id', async (req, res) => {
    const id_pais = req.params.id;
    try {
        const pais_eliminado = await eliminar_pais(id_pais);
        if (pais_eliminado === undefined){
            return res.status(404).json({error: "El pais que desea eliminar no esta disponible o no existe"});
        }
        return res.status(200).json(`Pais ${pais_eliminado} eliminado con exito`);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({error: "Error del servidor al eliminar el pais"});
    }
});


module.exports = router;