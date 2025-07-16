const express = require('express');
const router = express.Router();

const {
    get_all_autores,
    get_un_autor,
    crear_autor,
    eliminar_autor,
    actualizar_autor
} = require('../modelos/autores');

const {es_url_valido} = require('../validaciones/validaciones_generales');
const { body_autor_valido } = require('../validaciones/validaciones_autores');


router.get ('/api/autores', async (req,res) => {
    try{
        const autores = await get_all_autores();
        res.status(200).json(autores);
    }
    catch(error){
        res.status(500).json({error:'Error del servidor al obtener los libros.'});
    };
});

router.get ('/api/autores/:id', async (req,res) => {
    const autor_id = Number(req.params.id);
    if (!Number.isInteger(autor_id)){
        return res.status(400).send("Formato de ID no valido, debe ser un entero");
    };
    try{    
        const autor = await get_un_autor(autor_id);
        if (autor === undefined){
            res.status(404).send(`El autor #${autor_id} no ha sido encontrado :(`);
        }
        res.status(200).json(autor);
    }
    catch(error){
        res.status(500).send("Error del servidor al obtener el autor");
    };
});

// curl -X POST http://localhost:3000/api/autores -H "Content-Type: application/json" -d '{"nombre_completo": "Andres Espinoza", "nacionalidad": 1}'
router.post ('/api/autores', async (req,res) => { 
    const {
        nombre_completo,
        nacionalidad,
        fecha_nacimiento,
        retrato,
    } = req.body;


    //validar campos obligatorios
    if (!nombre_completo) {
    return res.status(400).send("Faltan campos obligatorios.");
    };

    //validar tipos de datos
    if (typeof nombre_completo !== 'string' || nombre_completo.trim() === ''){
        res.status(400).send("El nombre del autor debe ser un texto no vacío.")
    };
    if(nacionalidad && !Number.isInteger(Number(nacionalidad))){
        res.status(400).send("La nacionalidad no es válida");
        //falta comprobar que la nacionalidad exista :)
    };
    if (fecha_nacimiento && !Number.isInteger(Number(Date.parse(fecha_nacimiento)))){
        res.status(400).send("Fecha_nacimiento debe tener un formato de fecha válido (año-mes-dia).");
    };
    if (retrato && !es_url_valido(retrato)){
        res.status(400).send("El URL de la imagen no es válido");
    }

    try{

        const autor = await crear_autor(nombre_completo, nacionalidad, fecha_nacimiento, retrato);
        if (!autor) {
            return res.status(500).json({ error: 'Autor Nulo' });
        }; 
        res.status(201).send(`Autor ${nombre_completo} creado con éxito`);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Error del servidor no se pudo crear el libro');
    }
});


//Actualizar autor
//  curl -X PUT http://localhost:3000/api/autores/10 -H "Content-Type: application/json" -d '{"nombre_completo": "Andres Espinoza", "nacionalidad": 1, "fecha_nacimiento": null, "retrato": null}'
router.put('/api/autores/:id', async (req, res)=> {
    const autor_id = Number(req.params.id);
    if (!Number.isInteger(autor_id)){
        return res.status(400).send("Formato de ID no valido, debe ser un entero");
    };
    
    if (body_autor_valido(req.body) !== true){
        console.log("Pillao rata");
        return res.status(200);
    };

    const {
        nombre_completo,
        nacionalidad,
        fecha_nacimiento,
        retrato
    } = req.body;

    const autor_actual = await get_un_autor(autor_id);

    // Crear funcion es_autor ??
    const
        nombre_actual = autor_actual.nombre_completo,
        nacionalidad_actual = autor_actual.nacionalidad,
        fecha_actual = autor_actual.fecha_nacimiento,
        retrato_actual = autor_actual.retrato
    
    
    console.log(`Actualmente el autor tiene:\n Nombre:${nombre_actual}, Nacionalidad:${nacionalidad_actual}, fecha: ${fecha_actual}, retrato: ${retrato_actual}`);

    // if(existe_autor === undefined){
    //     return res.status(404).json({error: 'El autor que intentas actualizar no existe'});
    // }
    
    // const result = await actualizar_autor(nombre_completo, nacionalidad, fecha_nacimiento, retrato);
    return res.status(200);
});




// No se pueden borrar autores hasta cambiar la BDD

// router.delete('api/autores/:id', async (req, res) => {
//     const autor_id = Number(req.params.id);

//     if (!Number.isInteger(autor_id)){
//         return res.status(400).send("El id debe ser un numero")
//     }

//     try {
//         const autor_eliminado = await eliminar_autor(autor_id);
//         if (autor_eliminado === undefined){
//             return res.status(404).send("El autor que estas buscando no existe\n");
//         }
//         else {
//             res.status(201).send(`El autor ${autor_eliminado} ha sido eliminado con exito.\n`);
//         }
//     }
//     catch(error){
//         res.status(500).send('Error del servidor no se pudo crear el libro');
//     }
// });

// //actualizar libro
// app.put('/api/libros/:isbn_code', async (req, res)=> {


//     const existe_libro=await Obtener_libro(req.params.isbn_code);
//     if(existe_libro===undefined){
//         return res.status(404).json({error: 'El libro que intentas actualizar no existe'});
//     }
//     const result=await Actualizar_libro(req.params.isbn_code);

// });


module.exports = router;