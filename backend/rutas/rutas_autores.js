const express = require('express');
const router = express.Router();

const {
    get_all_autores,
    get_un_autor,
    crear_autor,
    eliminar_autor,
    actualizar_autor
} = require('../modelos/autores');

const {validar_request_autor} = require('../validaciones/validaciones_autores');

router.get ('/api/autores', async (req,res) => {
    try{
        const autores = await get_all_autores();
        res.status(200).json(autores);
    }
    catch(error){
        res.status(500).json({error:'Error del servidor al obtener los autores.'});
    };
});

router.get ('/api/autores/:id', async (req,res) => {
    const id_autor = Number(req.params.id);
    if (!Number.isInteger(id_autor)){
        return res.status(400).json({error: "Formato de ID invalido, debe ser un entero"});
    };

    try{    
        const autor = await get_un_autor(id_autor);
        if (autor === undefined){
            res.status(404).json({error: `El autor #${id_autor} no ha sido encontrado`});
        }
        res.status(200).json(autor);
    }
    catch(error){
        res.status(500).json({error: "Error del servidor al obtener el autor"});
    };
});

// curl -X POST http://localhost:3000/api/autores -H "Content-Type: application/json" -d '{"nombre_completo": "Andres Espinoza", "nacionalidad": 1}'
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
        const autor = await crear_autor(nombre_completo, nacionalidad, fecha_nacimiento, retrato);
        if (autor === undefined) {
            return res.status(500).json({ error: 'El autor que deseas crear ya existe'});
        }; 
        return res.status(201).json({mensaje: `Autor ${nombre_completo} creado con éxito`});
    }
    catch(error){
        return res.status(500).json({error: 'Error del servidor', mensaje: 'No se pudo crear el autor'});
    };
});


//Actualizar autor
// Prueba 1: curl -X PUT http://localhost:3000/api/autores/10 -H "Content-Type: application/json" -d '{"nombre_completo": "Andres Espinoza", "nacionalidad": 1, "fecha_nacimiento": null, "retrato": null}'
// Prueba 2: curl -X PUT http://localhost:3000/api/autores/10 -H "Content-Type: application/json" -d '{"nombre_completo": "J.L Borges", "nacionalidad": 1, "fecha_nacimiento": "1899-08-24"}'

router.put('/api/autores/:id', async (req, res)=> {
    const id_autor = Number(req.params.id);
    if (!Number.isInteger(id_autor)){
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
            return res.status(404).json({mensaje: "Autor no existe"});
        }
        return res.status(201).json({mensaje: `Autor ${autor_actualizado} actualizado con exito`});
    }
    catch(error){
        console.log(error);
        res.status(500).send('Error del servidor, no se pudieron modificar los datos');
    };
    
    // const result = await actualizar_autor(nombre_completo, nacionalidad, fecha_nacimiento, retrato);
    return res.status(200);
});


// No se pueden borrar autores reales hasta cambiar la BDD
router.delete('/api/autores/:id', async (req, res) => {
    const autor_id = Number(req.params.id);
    if (!Number.isInteger(autor_id)){
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
        return res.status(500).json({ error: 'Error del servidor', mensaje: 'No se pudo crear el libro'});
    }
});


module.exports = router;