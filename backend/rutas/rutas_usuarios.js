const express = require('express');
const router = express.Router();

const {
    validar_nombre_usuario, 
    validar_request_usuario,
    validar_patch_usuario
} = require('../validaciones/validaciones_usuarios');

const {
    get_all_usuarios, 
    get_un_usuario, 
    crear_usuario, 
    eliminar_usuario
} = require('../modelos/modelos_usuarios');

router.get ('/api/usuarios', async (req,res) => {
    try{
        const usuarios = await get_all_usuarios();
        res.status(200).json(usuarios);
    }
    catch(error){
        res.status(500).json({error:'Error del servidor al obtener los usuarios.'});
    };
});


router.get ('/api/usuarios/:nombre_usuario', async (req,res) => {
    const nombre_usuario = req.params.nombre_usuario;
    const validacion = validar_nombre_usuario(nombre_usuario); // Necesario?
    if (!validacion.resultado){
        res.status(validacion.status).json({error: validacion.mensaje});
    }

    try{    
        const usuario = await get_un_usuario(nombre_usuario);
        if (usuario === undefined){
            return res.status(404).json({error: `El usuario ${nombre_usuario} no ha sido encontrado o no existe`});
        }
        return res.status(200).json(usuario);
    }
    catch(error){
        return res.status(500).json({error: "Error del servidor al obtener al usuario"});
    };
});

// curl -X POST http://localhost:3000/api/usuarios -H "Content-Type: application/json" -d '{"nombre_usuario": "tostonsecreto", "contrasenia_encriptada": "denmepollito1", "nombre": "toston"}'
router.post ('/api/usuarios', async (req,res) => { 
    const validacion = await validar_request_usuario(req.body);
    if(!validacion.resultado){
        return res.status(validacion.status).json({ error: validacion.mensaje});
    };

    const {
        nombre_usuario,
        contrasenia_encriptada,
        foto_perfil,
        nombre,
        bio
    } = req.body;

    try {
        const usuario = await crear_usuario(nombre_usuario, contrasenia_encriptada, foto_perfil, nombre, bio);
        if (usuario === undefined){
            return res.status(409).json({error: "El usuario ya existe"}); //cambiar mensaje
        }
        return res.status(201).json({mensaje: `Usuario ${nombre_usuario} creado con exito`});
    }
    catch(error){
        return res.status(500).json({error: 'Error del servidor', mensaje: 'No se pudo crear el usuario'}); 
    }
});

router.delete('/api/autores/:nombre_usuario', async (req, res) => {
    const nombre_usuario = req.params.nombre_usuario;
    try {
        const usuario_eliminado = await eliminar_usuario(nombre_usuario);
        if (autor_eliminado === undefined){
            return res.status(404).json({error: "El usuario que quieres eliminar no existe"});
        }
        return res.status(201).json({mensaje: `El usuario ${nombre_usuario} ha sido eliminado con exito.`});
    }
    catch(error){
        return res.status(500).json({error: "Error del servidor", mensaje: "No se pudo eliminar el usuario"});
    };
});


// mas tarde cuando haya mas interfaz :)
router.patch('/api/autores', async (req, res) => {
    validar_patch_usuario(req.body);

    const {
        nombre_usuario,
    } = req.body;

    try {
        const usuario_eliminado = await eliminar_usuario(nombre_usuario);
        if (autor_eliminado === undefined){
            return res.status(404).json({error: "El usuario que quieres eliminar no existe"});
        }
        return res.status(201).json({mensaje: `El usuario ${nombre_usuario} ha sido eliminado con exito.`});
    }
    catch(error){
        return res.status(500).json({error: "Error del servidor", mensaje: "No se pudo eliminar el usuario"});
    };
});

module.exports = router;