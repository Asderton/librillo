const url_paises = "http://localhost:3000/api/paises";

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

    return true;
}

function estandarizar_datos(datos){
    const {
        fecha_nacimiento,
        retrato, 
        biografia
    } = datos;

    let retrato_estandar;
    let fecha_estandar;
    let biografia_estandar;

    if(retrato.trim() === ''){
        retrato_estandar = null;
    }
    else {
        retrato_estandar = retrato;
    }

    if (fecha_nacimiento === ''){
        fecha_estandar = null;
    }
    else {
        fecha_estandar = fecha_nacimiento
    }
    
    if (biografia.trim() === ''){
        biografia_estandar = null;
    }
    else {
        biografia_estandar = biografia;
    }

    return {...datos, retrato: retrato_estandar, fecha_nacimiento: fecha_estandar, biografia: biografia_estandar};
}

async function manejar_submit(event){
    const form = event.target;
    const url_post = form.action;
    event.preventDefault();

    const info_form = new FormData(form);
    const datos_form = Object.fromEntries(info_form.entries());
    if(!validar_datos(datos_form)){
        console.log("Error gallo")
        return;
    }
    const datos_estandatizados = estandarizar_datos(datos_form);

    const respuesta = await fetch(url_post,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos_estandatizados)
    });

    if (respuesta.ok) {
        window.location.href = '../';
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
    const response = await fetch(url_paises);
    const paises = await response.json();
    llenar_dropdown(paises);
}

window.addEventListener('load', fetch_data);


