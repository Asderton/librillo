const urlParams = new URLSearchParams(window.location.search);
const username_perfil = urlParams.get('username');

const icono_predeterminado = "https://www.ipburger.com/wp-content/uploads/2023/06/Untitled-36-%C3%97-36-in-2023-05-20T120139.136-1024x1024-1.webp"
const url_seguidos = `http://localhost:3000/api/usuarios/${username_perfil}/seguidos`;
const url_auth = "http://localhost:3000/api/me";


function mostrar_unfollow(){
    const botones = document.getElementsByClassName('link-unfollow');
    for (const boton of botones){
        boton.style.visibility = 'visible';
    }
}

async function crear_usuario(usuario){

    const imagen_usuario = document.createElement('img');
    imagen_usuario.classList.add('imagen-usuario');
    if (usuario.foto_perfil === null){
        imagen_usuario.src = icono_predeterminado;
    }
    else {
        imagen_usuario.src = usuario.foto_perfil;
    }

    const nombre_usuario = document.createElement('h4');
    nombre_usuario.classList.add('nombre-usuario');
    nombre_usuario.innerText = usuario.nombre;

    const link_usuario = document.createElement('a');
    link_usuario.classList.add('link-usuario');
    link_usuario.appendChild(nombre_usuario);
    link_usuario.href = `/usuario/?username=${usuario.username}`;


    const unfollow = document.createElement('h4');
    unfollow.classList.add('unfollow');
    unfollow.innerText = "Dejar de seguir";

    const link_unfollow = document.createElement('a');
    link_unfollow.classList.add('link-unfollow');
    link_unfollow.addEventListener('click', async () => {
        const respuesta = await fetchear(`http://localhost:3000/api/usuarios/seguidos/${usuario.username}`, {
            method: 'DELETE'
        });
        if (respuesta.ok){
            alert(`Has dejado de seguir a ${usuario.username}`);
            location.reload();
        }
        else {
            const error = await respuesta.json();
            alert(error.error);
            console.error(error);
            return;
        }
    });

    link_unfollow.appendChild(unfollow);

    const contenedor = document.createElement('div');
    contenedor.classList.add('usuario');
    contenedor.appendChild(imagen_usuario);
    contenedor.appendChild(link_usuario);
    contenedor.appendChild(link_unfollow);

    return contenedor;
}


async function llenar_usuarios(usuarios){
    if (usuarios.mensaje){
        alert("El usuario no tiene seguidos!!");
        window.location.href = `/usuario/?username=${username_perfil}`;
    }
    const contenedor_usuarios = document.getElementById('contenedor-usuarios');
    for (const usuario of usuarios){
        contenedor_usuarios.appendChild(await crear_usuario(usuario));
    }
}

function completar_mensaje_bienvenida(){
    const mensaje = document.getElementById('mensaje-bienvenida');
    mensaje.innerText = `En esta seccion encontraras todos los usuarios seguidos por  "${username_perfil}"`;
}

async function fetch_data() {
    const response = await fetch(url_seguidos);
    const seguidos = await response.json();
    completar_mensaje_bienvenida();
    llenar_usuarios(seguidos);
    check_auth();
}

async function check_auth(){

    const respuesta = await fetchear(url_auth);
    if (respuesta.ok){
        const usuario = await respuesta.json();
        if (usuario.username === username_perfil){
            console.log("qlqqq");
            mostrar_unfollow();
        }
    }
}


window.addEventListener('load', fetch_data);


