const express = require('express');
const router = express.Router();
const { middleware_jwt } = require('../middleware.js');

const { 
    validar_crear_usuario,
    validar_patch_usuario
} = require('../validaciones/validaciones_usuarios');

const {
    get_all_usuarios, 
    get_un_usuario, 
    crear_usuario, 
    eliminar_usuario
} = require('../modelos/modelos_usuarios');

// Obtener todos los usuarios
router.get ('/api/usuarios', async (req,res) => {
    try{
        const usuarios = await get_all_usuarios();
        res.status(200).json(usuarios);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Error del servidor al obtener los usuarios."});
    };
});

// Obtener un usuario
router.get ('/api/usuarios/:username', async (req,res) => {
    const username = req.params.username;
    try{    
        const usuario = await get_un_usuario(username);
        if (usuario === undefined){
            return res.status(404).json({error: `El usuario ${username} no ha sido encontrado o no existe`});
        }
        return res.status(200).json(usuario);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Error del servidor al obtener al usuario"});
    };
});

// Crear un usuario
router.post ('/api/usuarios', async (req,res) => { 
    const validacion = await validar_crear_usuario(req.body);
    if(!validacion.resultado){
        return res.status(validacion.status).json({ error: validacion.mensaje});
    };

    const {
        username,
        clave_plana,
        foto_perfil,
        nombre,
        bio
    } = req.body;

    try {
        const usuario_creado = await crear_usuario(username, clave_plana, foto_perfil, nombre, bio);
        if (usuario_creado === undefined){
            return res.status(409).json({error: "El usuario ya existe"});
        }
        return res.status(201).json({mensaje: `Usuario ${username} creado con exito`});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Error del servidor al crear al usuario"}); 
    }
});

// Eliminar un usuario
router.delete('/api/usuarios', middleware_jwt, async (req, res) => {   
    const username_cliente = req.auth.username;// CAMBIARRRRRR
    try {
        const usuario_eliminado = await eliminar_usuario(username_cliente);
        if (usuario_eliminado === undefined){
            return res.status(404).json({error: "El usuario que quieres eliminar no existe"}); //No puede pasar pero weno no se (sami)
        }
        
/////////////////////////////////////////////////////////// FALTA HACER LOGOUT ACA

        return res.status(201).json({mensaje: `El usuario ${username_cliente} ha sido eliminado con exito.`});  
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Error del servidor al eliminar al usuario"});
    };
});

router.get('/api/me', middleware_jwt, (req, res) => {
    return res.status(200).json(req.auth);
});


// mas tarde cuando haya mas interfaz :)
router.patch('/api/usuarios', async (req, res) => {
    validar_patch_usuario(req.body);

    const {
        username,
    } = req.body;

    try {
        const usuario_eliminado = await eliminar_usuario(username);
        if (usuario_eliminado === undefined){
            return res.status(404).json({error: "El usuario que quieres eliminar no existe"});
        }
        return res.status(201).json({mensaje: `El usuario ${username} ha sido eliminado con exito.`});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Error del servidor", mensaje: "No se pudo eliminar el usuario"});
    };
});

module.exports = router;