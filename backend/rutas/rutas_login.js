const express = require('express');
const router = express.Router();
const {logear_usuario} = require('../modelos/modelos_login.js');
const {validar_login} = require('../validaciones/validaciones_login.js');

router.post ('/api/login', async (req, res) => {
    const validacion = validar_login(req.body);
    if(!validacion.resultado){
        return res.status(validacion.status).json({ error: validacion.mensaje});
    };
    const {
        username,
        clave_plana
    } = req.body;

    try {
        const usuario_logeado = await logear_usuario(username, clave_plana);
        if (usuario_logeado ===  undefined){
            return res.status(404).json({error: "El usuario no existe"});
        }
    }
    catch(error){
        return res.status(500).json({error: 'Error del servidor', mensaje: 'No se pudo obtener la informacion de inicio de sesion'});
    }
    

});


module.exports = router;