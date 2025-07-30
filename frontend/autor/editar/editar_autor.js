const urlParams = new URLSearchParams(window.location.search);
const id_autor = urlParams.get('id_autor');

const url_paises = "http://localhost:3000/api/paises";
const url_autores = `http://localhost:3000/api/autores/${id_autor}`;

function crear_opcion(pais){
    const {id_pais, nombre_pais} = pais
    const opcion = document.createElement('option');
    opcion.value = id_pais;
    opcion.innerText = nombre_pais;
    return opcion;
}

async function llenar_dropdown(paises) {
    const dropdown = document.getElementById("nacionalidades");
    for (const pais of paises){
        const opcion = crear_opcion(pais); 
        dropdown.appendChild(opcion);
    }
    return;
}

function validar_datos(datos){
    const {nombre_completo} = datos;

    if (nombre_completo.trim() === ''){
        alert('El nombre no puede estar vacio');
        return false;
    }
    return true;
}

function estandarizar_datos(datos) {
    const { fecha_nacimiento, retrato, biografia } = datos;

    let retrato_estandar = retrato;
    let fecha_nacimiento_estandar = fecha_nacimiento;
    let biografia_estandar = biografia;

    if(retrato.trim() === ''){
        retrato_estandar = null;
    }
    if (fecha_nacimiento === ''){
        fecha_nacimiento_estandar = null;
    }
    if (biografia.trim() === ''){
        biografia_estandar = null;
    }
    return {...datos, retrato: retrato_estandar, fecha_nacimiento: fecha_nacimiento_estandar, biografia: biografia_estandar};
}

async function llenar_defaults(info_autor){
    const {nombre_completo, retrato, biografia} = info_autor;

    const nombre = document.getElementById('nombre-autor');
    nombre.value = nombre_completo;

    const url_retrato = document.getElementById('retrato-autor');
    url_retrato.value = retrato;

    const espacio_bio = document.getElementById('biografia-autor');
    espacio_bio.value = biografia;

    const editando = document.getElementById('mensaje-editando');
    editando.innerText = `Editando a ${nombre_completo}`;

    return;
} 


async function manejar_submit(event){
    const form = event.target;
    event.preventDefault();

    const info_form = new FormData(form);
    const datos_form = Object.fromEntries(info_form.entries());
    if (!validar_datos(datos_form)) {
        return;
    }

    const datos_estandatizados = estandarizar_datos(datos_form);
    datos_estandatizados.id_autor = {id_autor};

    const respuesta = await fetch(url_autores,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos_estandatizados)
    });

    if (respuesta.ok) {
        window.location.href = '/autores/';
        return;
    } else {    
        const error = await respuesta.json();
        console.error(error);
        return;
    }
}

async function fetch_data() {
    const respuesta_paises = await fetch(url_paises);
    const paises = await respuesta_paises.json();
   
    const respuesta_autor = await fetch(url_autores);
    const info_autor = await respuesta_autor.json();
    
    llenar_defaults(info_autor);
    llenar_dropdown(paises);
}

window.addEventListener('load', fetch_data);


