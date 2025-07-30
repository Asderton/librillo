const url_paises = "http://localhost:3000/api/paises";

function estandarizar_datos(datos){
    campos = ["nacionalidad", "fecha_nacimiento", "retrato", "biografia"];
    for (campo of campos){
        if (datos[campo] === ""){
            datos[campo] =  null;
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
    console.log(datos_estandatizados);
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
        alert(error.error);
        return;
    }
}

function crear_opcion_pais(pais){
    const {id_pais, nombre_pais} = pais
    const opcion = document.createElement('option');
    opcion.value = id_pais;
    opcion.innerText = nombre_pais;
    return opcion;
}

async function llenar_paises(paises) {
    const dropdown = document.getElementById("nacionalidades");
    for (const pais of paises){
        const opcion = crear_opcion_pais(pais); 
        dropdown.appendChild(opcion);
    }
    return;
}

async function fetch_data() {
    const response = await fetch(url_paises);
    const paises = await response.json();
    llenar_paises(paises);
}

window.addEventListener('load', fetch_data);


