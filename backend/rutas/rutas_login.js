const express = require('express');
const router = express.Router();
const {logear_usuario} = require('../modelos/modelos_login.js');
const {validar_login} = require('../validaciones/validaciones_login.js');
const {firmar_objeto} = require('../middleware.js')

router.post('/api/login', async (req, res) => {
    console.log(req.body);
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
        if (!usuario_logeado){
            return res.status(400).json({error: "Clave incorrecta"});
        }

        const token = firmar_objeto(usuario_logeado);
        return res.status(200).json({ token });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Error del servidor al iniciar sesion"});
    }
});

module.exports = router;