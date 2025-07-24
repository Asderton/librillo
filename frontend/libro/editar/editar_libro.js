const urlParams = new URLSearchParams(window.location.search);
const isbn_code = urlParams.get('isbn_code');
const titulo = urlParams.get('titulo');

const url_idiomas = "http://localhost:3000/api/idiomas";

function crear_opcion(idioma){
    const {id_idioma, nombre_idioma} = idioma
    const opcion = document.createElement('option');
    opcion.value = id_idioma;
    opcion.innerText = nombre_idioma;
    return opcion;
}

function validar_datos(datos){
    const {
        titulo,
        descripcion,
        numero_de_paginas,
        idioma_id
    } = datos;

    if (!titulo || !descripcion || !numero_de_paginas || !idioma_id) {
        return alert("Faltan campos obligatorios");
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
    const url_put = `http://localhost:3000/api/libros/${isbn_code}`;
    event.preventDefault();

    const info_form = new FormData(form);
    const datos_form = Object.fromEntries(info_form.entries());
    validar_datos(datos_form);
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
        console.log(error);
        return;
    }
}



async function llenar_dropdown(idiomas) {
    const dropdown = document.getElementById("idiomas");
    for (const idioma of idiomas){
        const opcion = crear_opcion(idioma); 
        dropdown.appendChild(opcion);
    }
    return;
}


async function fetch_data() {
    const response = await fetch(url_idiomas);
    const idiomas = await response.json();
    const mensaje_bienvenida = document.getElementById('mensaje-editar');
    mensaje_bienvenida.innerHTML = `Editando a ${titulo}`;

    llenar_dropdown(idiomas);
}

window.addEventListener('load', fetch_data);


