const urlParams = new URLSearchParams(window.location.search);
const username_perfil = urlParams.get('username');

const url_logout = "http://localhost:3000/api/logout"
const url_info_usuario = `http://localhost:3000/api/usuarios/${username_perfil}`;
const url_delete_usuario = "http://localhost:3000/api/usuarios"
const default_icon = 'https://www.ipburger.com/wp-content/uploads/2023/06/Untitled-36-%C3%97-36-in-2023-05-20T120139.136-1024x1024-1.webp';

function crear_retrato(retrato){
    const contenedor = document.getElementById('contenedor-imagen-usuario');   

    const imagen = document.createElement('img');
    imagen.classList.add('imagen-retrato');

    if (retrato === null){
        retrato = default_icon;
    }
    imagen.src = retrato;
    contenedor.appendChild(imagen);
    return;
}

function crear_info(usuario){
    const {
        username,
        nombre,
        bio
    } = usuario;

    const contenedor = document.getElementById('contenedor-informacion');

    // Nombre autor
    const titulo_username = document.createElement('h1');
    titulo_username.classList.add('nombre-username');
    titulo_username.innerText = username;
    contenedor.appendChild(titulo_username);

    // Fecha nacimiento y nacionalidad
    const nombre_perfil = document.createElement('h3');
    nombre_perfil.innerText = `Nombre: ${nombre}`;

   
    const informacion = document.createElement('div');
    informacion.classList.add('info-basica');
    informacion.appendChild(nombre_perfil);
    contenedor.appendChild(informacion);

    //biografia
    const contenedor_bio = document.createElement('div');
    contenedor_bio.id = 'contenedor-bio';

    const titulo = document.createElement('h3');
    titulo.innerText = 'Biografia:';

    const biografia = document.createElement('p');
    biografia.id = 'biografia-usuario';
    if (bio === null){
        biografia.innerText = "El usuario no tiene biografia";
    }
    else {
        biografia.innerText = bio;
    }
    contenedor_bio.appendChild(titulo);
    contenedor_bio.appendChild(biografia);
    contenedor.appendChild(contenedor_bio);
}

async function linkear_botones(usuario){
    const boton_logout = document.getElementById('cerrar-sesion');
    boton_logout.addEventListener("click", () => {
        const confirmado = confirm("Desea cerrar sesion?");
        if (confirmado){
            localStorage.removeItem('token');
            window.location.href = '../homepage/';
        }
        else{ 
            return;
        }
    })

    const boton_editar = document.getElementById('boton-editar');
    boton_editar.href = `./editar/?username=${usuario.username}`;

    const boton_borrar = document.getElementById('boton-borrar');
    boton_borrar.addEventListener("click", async () => {
        const confirmado = confirm("Desea eliminar este usuario?");
        if (confirmado){
            const result = await fetchear(url_delete_usuario, {
                method: 'DELETE'
            })
            localStorage.removeItem('token');
            window.location.href = '/frontend/homepage/'
        }
        else{ 
            return;
        }
    });
}

function crear_contenedor(usuario) {
    crear_retrato(usuario.foto_perfil);
    crear_info(usuario);
    return;
}

function llenar_biblioteca(libros){
    const biblioteca = document.getElementById('contenedor-biblioteca');
    for (const libro of libros){
        const libro_creado = crear_libro(libro);
        biblioteca.appendChild(libro_creado);
    }
    return;
}

function crear_libro(libro){
    const {
        isbn_code,
        titulo,
        imagen_portada
    } = libro;

    const default_icon = 'https://www.ipburger.com/wp-content/uploads/2023/06/Untitled-36-%C3%97-36-in-2023-05-20T120139.136-1024x1024-1.webp';

    const link = document.createElement('a');
    link.href = (`../libro/?isbn_code=${isbn_code}`);

    const contenedor_libro = document.createElement('div');
    contenedor_libro.classList.add('contenedor_libro');
    link.appendChild(contenedor_libro);

    const contenedor_imagen_portada = document.createElement('div');
    contenedor_imagen_portada.classList.add('imagen');
    contenedor_libro.appendChild(contenedor_imagen_portada);

    const portada = document.createElement('img');
    portada.classList.add('imagen_libro');
    if (imagen_portada === null){
        portada.src = default_icon;
    }
    else{
           portada.src = imagen_portada;
    }
    contenedor_imagen_portada.appendChild(portada);

    const contenedor_nombre = document.createElement('div');
    contenedor_nombre.classList.add('titulo');
    contenedor_libro.appendChild(contenedor_nombre);

    const titulo_libro = document.createElement('p');
    titulo_libro.classList.add('titulo_libro');
    titulo_libro.innerText = titulo;
    contenedor_nombre.appendChild(titulo_libro);

    return link;
}

async function fetch_data() {
    const response = await fetch(url_info_usuario);
    const usuario = await response.json();
    await comprobar_sesion();
    linkear_botones(usuario);
    crear_contenedor(usuario);
    // llenar_biblioteca(autor.libros);
    return;
}

function mostrar_opciones(){
    const opciones = document.getElementsByClassName('opciones');
    for (const opcion of opciones){
        opcion.style.visibility = 'visible';
    }
}

async function comprobar_sesion() {
    if (localStorage.getItem('token')){
        const url = "http://localhost:3000/api/me";
        const result = await fetchear(url);
        if (result.ok){
            const usuario = await result.json();
            const { username } = usuario;
            if (username === username_perfil){
                console.log('entro');
                mostrar_opciones();
                return;
            }
        }
        else {
            const error = await result.json();
            console.log(error);
            return null;
        }
    }
}

window.addEventListener('load', fetch_data);


