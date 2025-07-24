const express = require('express');
const router = express.Router();

const {
    get_all_autores,
    get_un_autor,
    crear_autor,
    eliminar_autor,
    actualizar_autor
} = require('../modelos/modelos_autores.js');

const {validar_request_autor} = require('../validaciones/validaciones_autores'); //?

// Ver todos los autores
router.get ('/api/autores', async (req,res) => {
    try{
        const autores = await get_all_autores();
        autores.sort((a, b) => a.nombre_completo.localeCompare(b.nombre_completo));
        console.log(autores);

        return res.status(200).json(autores);
    }

    catch(error){
        console.log(error);
        return res.status(500).json({error:"Error del servidor al obtener los autores."});
    };
});

// Ver autor por id
router.get ('/api/autores/:id', async (req,res) => {
    const id_autor = req.params.id;
    console.log(id_autor);
    if (!Number.isInteger(Number(id_autor))){

        return res.status(400).json({error: "Formato de ID invalido, debe ser un entero"});
    };

    try{    
        const autor = await get_un_autor(id_autor);
        if (autor === undefined){

            return res.status(404).json({error: "El autor no ha sido encontrado"});
        }
        return res.status(200).json(autor);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Error del servidor al obtener el autor"});
    };
});

// Crear un autor
router.post ('/api/autores', async (req,res) => { 

    const validacion = validar_request_autor(req.body);
    if(!validacion.resultado){
        return res.status(validacion.status).json({ error: validacion.mensaje});
    };

    const {
        nombre_completo,
        nacionalidad,
        fecha_nacimiento,
        retrato,
    } = req.body;

    try{
        const autor_creado = await crear_autor(nombre_completo, nacionalidad, fecha_nacimiento, retrato);
        if (autor_creado === undefined) {
            return res.status(400).json({ error: "Datos de autor invalidos"});

        }; 
        return res.status(201).json({mensaje: `Autor ${nombre_completo} creado con éxito`});
    }
    catch(error){

        console.log(error);
        return res.status(500).json({error: "Error del servidor al crear autor"});

    };
});


//Actualizar autor

router.put('/api/autores/:id', async (req, res)=> {
    const id_autor = req.params.id;
    if (!Number.isInteger(Number(id_autor))){
        return res.status(400).send("Formato de ID no valido, debe ser un entero");
    };

    const validacion = validar_request_autor(req.body);
    if (!validacion.resultado){
        return res.status(validacion.status).json({ error: validacion.mensaje});
    }

    const {
        nombre_completo,
        nacionalidad,
        fecha_nacimiento,
        retrato
    } = req.body;

    try{
        const autor_actualizado = await actualizar_autor(id_autor, nombre_completo, nacionalidad, fecha_nacimiento, retrato);
        if(autor_actualizado === undefined){

            return res.status(404).json({error: "Datos de autor invalidos"});

        }
        return res.status(201).json({mensaje: `Autor ${autor_actualizado} actualizado con exito`});
    }
    catch(error){
        console.log(error);

        return res.status(500).json({error: "Error del servidor al actualizar los datos"});
    }
});


// Eliminar autor
router.delete('/api/autores/:id', async (req, res) => {
    const autor_id = req.params.id;
    if (!Number.isInteger(Number(autor_id))){

        return res.status(400).json({ error: "El id debe ser un numero"});
    }

    try {
        const autor_eliminado = await eliminar_autor(autor_id);
        if (autor_eliminado === undefined){
            return res.status(404).json({ error: "El autor que quieres eliminar no existe"});


        }
        else {
            return res.status(201).json({ mensaje: `El autor ${autor_eliminado} ha sido eliminado con exito.\n`});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ error: 'Error del servidor al eliminar'});

    }
});


module.exports = router;