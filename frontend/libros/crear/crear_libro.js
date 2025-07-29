const url_idiomas = "http://localhost:3000/api/idiomas";
const url_autores = "http://localhost:3000/api/autores";


function crear_opcion_idioma(idioma){
    const {id_idioma, nombre_idioma} = idioma
    const opcion = document.createElement('option');
    opcion.value = id_idioma;
    opcion.innerText = nombre_idioma;
    return opcion;
}

function crear_opcion_autor(autor){
    const {id_autor, nombre_completo} = autor
    const opcion = document.createElement('option');
    opcion.value = id_autor;
    opcion.innerText = nombre_completo;
    return opcion;
}

function validar_datos(datos){
    const {
        isbn_code,
        titulo,
        descripcion,
        numero_de_paginas,
        idioma_id
    } = datos;

    if (!isbn_code || !titulo || !descripcion || !numero_de_paginas || !idioma_id) {
        return alert("Faltan campos obligatorios");
    }
    if (!Number.isInteger(Number(isbn_code))) {
        return alert("El codigo isbn debe ser un numero entero");
    }
    if (typeof titulo !== 'string' || titulo.trim() === '') {
        return alert("El titulo debe ser un texto no vacio");
    }   
    if (typeof descripcion !== 'string' || descripcion.trim() === '') {
        return alert("La descripcion debe ser un texto no vacio");
    }
    
    if (!Number.isInteger(Number(numero_de_paginas)) || Number(numero_de_paginas) <= 0) {
        return alert("El numero de paginas debe ser un entero positivo");
    }

}

function estandarizar_datos(datos){
    const {
        fecha_publicacion,
        imagen_portada
    } = datos;

    let fecha_estandar;
    let imagen_estandar;

    if(imagen_portada.trim() === ''){
        retrato_estandar = null;
    }
    else {
        imagen_estandar = imagen_portada;
    }

    if (fecha_publicacion === ''){
        fecha_estandar = null;
    }
    else{
        fecha_estandar = fecha_publicacion;
    }
    return {...datos, imagen_portada: imagen_estandar, fecha_publicacion: fecha_estandar};
}

async function manejar_submit(event){
    const form = event.target;
    const url_post = form.action;
    event.preventDefault();

    const info_form = new FormData(form);
    const datos_form = Object.fromEntries(info_form.entries());
    validar_datos(datos_form);
    const datos_estandatizados = estandarizar_datos(datos_form);

    const respuesta = await fetch(url_post,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos_estandatizados)
    });

    if (respuesta.ok) {
        window.location.href = '/frontend/libros/';
        return;
    } else {
        const error = await respuesta.json();
        console.error(error);
        return;
    }
}


async function llenar_idiomas(idiomas) 
{
    const dropdown = document.getElementById("idiomas");
    for (const idioma of idiomas){
        const opcion = crear_opcion_idioma(idioma); 
        dropdown.appendChild(opcion);
    }
    return;
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
    const respuesta_autores = await fetch(url_autores);
    const autores = await respuesta_autores.json();

    llenar_idiomas(idiomas);
    llenar_autores(autores);

}

window.addEventListener('load', fetch_data);


