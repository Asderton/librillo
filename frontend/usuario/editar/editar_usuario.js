const urlParams = new URLSearchParams(window.location.search);
const username_perfil = urlParams.get('username');

const url_usuario = `http://localhost:3000/api/usuarios/${username_perfil}`;
const url_auth =  `http://localhost:3000/api/me`;

function estandarizar_datos(datos){
    const campos = ["foto_perfil", "bio"];

    for (const campo of campos){
        if (datos[campo] === ""){
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

    const respuesta = await fetchear(url_post,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos_estandatizados)
    });

    if (respuesta.ok) {
        alert('Usuario editado con exito');
        window.location.href = '/';
    } else {    
        const error = await respuesta.json();
        alert(error.error);
        console.error(error);
        return;
    }
}

async function llenar_defaults(){
    const resultado = await fetch(url_usuario);
    const usuario = await resultado.json();

    const nombre = document.getElementById("nombre");
    nombre.value = usuario.nombre;
    const foto_perfil = document.getElementById("foto_perfil");
    foto_perfil.value = usuario.foto_perfil;
    const bio = document.getElementById("bio");
    bio.value = usuario.bio;

}

async function check_auth(){
    const respuesta = await fetchear(url_auth);
    if (respuesta.ok){
        const usuario = await respuesta.json();
        if (usuario.username !== username_perfil){
            alert("No estas registrado como este usuario!!");
            window.location.href = '/usuarios/';
            return;
        }
    }
    else {
        if (respuesta.status === 401){
            alert("No estas autorizado para modificar este perfil");
            window.location.href = '/usuarios/';
        }
        const error = await respuesta.json();
        alert(error.error);
        console.error(error);
        return;
    }

    llenar_defaults()
}

window.addEventListener('load', check_auth);