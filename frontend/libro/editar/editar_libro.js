const urlParams = new URLSearchParams(window.location.search);
const isbn_code = urlParams.get('isbn_code');
const titulo = urlParams.get('titulo');


const url_idiomas = "http://localhost:3000/api/idiomas";
const url_libro = `http://localhost:3000/api/libros/${isbn_code}`;
const url_autores = "http://localhost:3000/api/autores";



function estandarizar_datos(datos){

    if (datos.id_autor === ''){
        datos.id_autor = null;
    }
    if (datos.idioma_id === ''){
        datos.idioma_id = null;
    }
    if (datos.fecha_publicacion === ''){
        datos.fecha_publicacion = null;
    }
    if (datos.numero_de_paginas === ''){
        datos.numero_de_paginas = null;
    }
    if (datos.imagen_portada === ''){
        datos.imagen_portada = null;
    }
    if (datos.descripcion === ''){
        datos.descripcion = null;
    }

    return {...datos};
}


async function manejar_submit(event){
    const form = event.target;
    const url_put = `http://localhost:3000/api/libros/${isbn_code}`;
    event.preventDefault();

    const info_form = new FormData(form);
    const datos_form = Object.fromEntries(info_form.entries());
    const datos_estandatizados = estandarizar_datos(datos_form);

    const respuesta = await fetch(url_put,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos_estandatizados)
    });

    if (respuesta.ok) {
        window.location.href = '../../libros/';
        return;
    }
    else {    
        const error = await respuesta.json();
        console.error(error);
        alert(error.error);
        return;
    }
}

async function llenar_defaults(libro){
    const titulo = document.getElementById('titulo');
    titulo.value = libro.titulo;

    if (libro.fecha_publicacion !== null){
        const fecha = document.getElementById('fecha-publicacion');
        fecha_formateada = libro.fecha_publicacion.split("T")[0];
        fecha.value = fecha_formateada;
    }

    const autor = document.getElementById('autores');
    autor.value = libro.id_autor;
    

    const idioma = document.getElementById('idiomas');
    idioma.value = libro.idioma_id;

    const n_paginas = document.getElementById('n-paginas');
    n_paginas.value = libro.numero_de_paginas;

    const portada_libro = document.getElementById('portada-libro');
    portada_libro.value = libro.imagen_portada;

    const descripcion = document.getElementById('descripcion');
    descripcion.value = libro.descripcion;

    return;
} 

function crear_opcion_idioma(idioma){
    const {id_idioma, nombre_idioma} = idioma
    const opcion = document.createElement('option');
    opcion.value = id_idioma;
    opcion.innerText = nombre_idioma;
    return opcion;
}

function llenar_idiomas(idiomas) 
{
    const dropdown = document.getElementById("idiomas");
    for (const idioma of idiomas){
        const opcion = crear_opcion_idioma(idioma); 
        dropdown.appendChild(opcion);
    }
    return;
}

function crear_opcion_autor(autor){
    const {id_autor, nombre_completo} = autor
    const opcion = document.createElement('option');
    opcion.value = id_autor;
    opcion.innerText = nombre_completo;
    return opcion;
}

function llenar_autores(autores){
    const dropdown = document.getElementById("autores");
    for (const autor of autores){
        const opcion = crear_opcion_autor(autor); 
        dropdown.appendChild(opcion);
    }
    return;
}


async function fetch_data() {
    const respuesta_idiomas = await fetch(url_idiomas);
    const idiomas = await respuesta_idiomas.json();
    llenar_idiomas(idiomas);

    const respuesta_autores = await fetch(url_autores);
    const autores = await respuesta_autores.json();
    llenar_autores(autores);


    const respuesta_libro = await fetch(url_libro);
    const libro = await respuesta_libro.json();
    llenar_defaults(libro);

    const mensaje_bienvenida = document.getElementById('mensaje-editar');
    mensaje_bienvenida.innerHTML = `Editando a ${titulo}`;
}


window.addEventListener('load', fetch_data);


