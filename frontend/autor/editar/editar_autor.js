const urlParams = new URLSearchParams(window.location.search);
const id_autor = urlParams.get('id_autor');

const url_paises = "http://localhost:3000/api/paises";
const url_autores = `http://localhost:3000/api/autores/${id_autor}`;

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
    event.preventDefault();

    const info_form = new FormData(form);
    const datos_form = Object.fromEntries(info_form.entries());

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
        alert(error.error);
        return;
    }
}

async function llenar_defaults(autor){

    const nombre = document.getElementById('nombre-autor');
    nombre.value = autor.nombre_completo;

    const nacionalidad = document.getElementById('nacionalidades');
    nacionalidad.value = autor.id_pais;

    if (autor.fecha_nacimiento !== null){
        const fecha = document.getElementById('fecha-nacimiento');
        fecha_formateada = autor.fecha_nacimiento.split("T")[0];
        fecha.value = fecha_formateada;
    }

    const url_retrato = document.getElementById('retrato-autor');
    url_retrato.value = autor.retrato;

    const espacio_bio = document.getElementById('biografia-autor');
    espacio_bio.value = autor.biografia;

    const editando = document.getElementById('mensaje-editando');
    editando.innerText = `Editando a ${autor.nombre_completo}`;

    return;
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
    const respuesta_paises = await fetch(url_paises);
    const paises = await respuesta_paises.json();
    llenar_paises(paises);
   
    const respuesta_autor = await fetch(url_autores);
    const autor = await respuesta_autor.json();
    llenar_defaults(autor);
}

window.addEventListener('load', fetch_data);


