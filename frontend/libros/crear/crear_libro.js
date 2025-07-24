const url_idiomas = "http://localhost:3000/api/idiomas";

function crear_opcion(pais){
    const {id_pais, nombre_pais} = pais
    const opcion = document.createElement('option');
    opcion.value = id_pais;
    opcion.innerText = nombre_pais;
    return opcion;
}

function validar_datos(datos){
    const {nombre_completo} = datos;

    if (nombre_completo.trim() === ''){
        alert('El nombre no puede estar vacio')
        return false;
    }
}

function estandarizar_datos(datos){
    const {
        nacionalidad,
        fecha_nacimiento,
        retrato
    } = datos;

    if(retrato.trim() === ''){
        retrato_estandar = null;
    }

    if (fecha_nacimiento === ''){
        fecha_nacimiento_estandar = null;
    }
    console.log(fecha_nacimiento);
    return {...datos, retrato: retrato_estandar, fecha_nacimiento: fecha_nacimiento_estandar};
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


    console.log(typeof respuesta);
    if (respuesta.ok) {
        window.location.href = '../autores/';
        return;
    } else {    
        const error = await respuesta.json();
        console.error(error);
        return;
    }
}


async function llenar_dropdown(paises) {
    const dropdown = document.getElementById("nacionalidades");
    for (const pais of paises){
        const opcion = crear_opcion(pais); 
        dropdown.appendChild(opcion);
    }
    return;
}


async function fetch_data() {
    const response = await fetch(url);
    const paises = await response.json();

    llenar_dropdown(paises);
}

window.addEventListener('load', fetch_data);


