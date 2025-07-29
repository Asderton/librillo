const url = "http://localhost:3000/api/usuarios";

function crear_contenedor(autor){
    const {
        username,
        foto_perfil
    } = autor;

    const default_icon = 'https://www.ipburger.com/wp-content/uploads/2023/06/Untitled-36-%C3%97-36-in-2023-05-20T120139.136-1024x1024-1.webp';

    const link = document.createElement('a');
    link.href = (`/frontend/usuario/?username=${username}`);

    const contenedor_libro = document.createElement('div');
    contenedor_libro.classList.add('contenedor_libro');
    link.appendChild(contenedor_libro);

    const contenedor_portada = document.createElement('div');
    contenedor_portada.classList.add('imagen');
    contenedor_libro.appendChild(contenedor_portada);

    const portada = document.createElement('img');
    portada.classList.add('imagen_libro');
    if (foto_perfil === null){
        portada.src = default_icon;
    }
    else{
        portada.src = foto_perfil;
    }
    contenedor_portada.appendChild(portada);

    const contenedor_nombre = document.createElement('div');
    contenedor_nombre.classList.add('titulo');
    contenedor_libro.appendChild(contenedor_nombre);

    const nombre_autor = document.createElement('p');
    nombre_autor.classList.add('titulo_libro');
    nombre_autor.innerText = username;
    contenedor_nombre.appendChild(nombre_autor);

    return link;
}


function llenar_biblioteca(usuarios) {
    const biblioteca = document.getElementById("contenedor_biblioteca");
    for (const usuario of usuarios){
        const contenedor = crear_contenedor(usuario); 
        biblioteca.appendChild(contenedor);
    }
    return;
}




async function fetch_data() {
    const response = await fetch(url);
    const usuarios = await response.json();

    llenar_biblioteca(usuarios);
}

window.addEventListener('load', fetch_data);


