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
        if (!usuario_logeado){
            return res.status(400).json({error: "Clave incorrecta"});
        }

        req.session.user = usuario_logeado;
        res.send("Sesion iniciada!");
        return res.status(200).json(usuario_logeado);
    }
    catch(error){
        return res.status(500).json({error: "Error del servidor al iniciar sesion"});
    }
});

router.post('/api/logout', (req,res) => {
    req.session.destroy( error => {
        if (error){
            console.log(error);
            return res.status(500).json({error: "Error del servidor al cerrar sesion"});
        }
        res.send("Sesion cerrada!");
    });
})

module.exports = router;