const url_idiomas = "http://localhost:3000/api/idiomas";
const url_autores = "http://localhost:3000/api/autores";

function estandarizar_datos(datos){
    const campos = ["autor", "idioma_id", "fecha_publicacion", "numero_de_paginas", "imagen_portada", "descripcion"];

    for (const campo of campos){
        if (datos[campo] ===  ""){
            datos[campo] = null;
        }
    }

    return {...datos};
}

async function manejar_submit(event){
    const form = event.target;
    const url_post = form.action;
    event.preventDefault();

    const info_form = new FormData(form);
    const datos_form = Object.fromEntries(info_form.entries());
    const datos_estandatizados = estandarizar_datos(datos_form);

    const respuesta = await fetch(url_post,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos_estandatizados)
    });

    if (respuesta.ok) {
        window.location.href = '/libros/';
        return;
    } else {
        const error = await respuesta.json();
        console.error(error);
        alert(error.error);
        return;
    }
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
}

window.addEventListener('load', fetch_data);


