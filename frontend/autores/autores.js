const url = "http://localhost:3000/api/autores";

function crear_contenedor(autor){
    const {
        id_autor,
        nombre_completo,
        retrato
    } = autor;

    const default_icon = 'https://www.ipburger.com/wp-content/uploads/2023/06/Untitled-36-%C3%97-36-in-2023-05-20T120139.136-1024x1024-1.webp';

    const link = document.createElement('a');
    link.href = (`../autor/?id_autor=${id_autor}`);

    const contenedor_libro = document.createElement('div');
    contenedor_libro.classList.add('contenedor_libro');
    link.appendChild(contenedor_libro);

    const contenedor_retrato = document.createElement('div');
    contenedor_retrato.classList.add('imagen');
    contenedor_libro.appendChild(contenedor_retrato);

    const imagen_retrato = document.createElement('img');
    imagen_retrato.classList.add('imagen_libro');
    if (retrato === null){
        imagen_retrato.src = default_icon;
    }
    else{
           imagen_retrato.src = retrato;
    }
    contenedor_retrato.appendChild(imagen_retrato);

    const contenedor_nombre = document.createElement('div');
    contenedor_nombre.classList.add('titulo');
    contenedor_libro.appendChild(contenedor_nombre);

    const nombre_autor = document.createElement('p');
    nombre_autor.classList.add('titulo_libro');
    nombre_autor.innerText = nombre_completo;
    contenedor_nombre.appendChild(nombre_autor);

    return link;
}





async function llenar_biblioteca(autores) {
    const biblioteca = document.getElementById("contenedor_biblioteca");
    for (const autor of autores){
        const contenedor = crear_contenedor(autor); 
        biblioteca.appendChild(contenedor);
    }
    return;
}




async function fetch_data() {
    const response = await fetch(url);
    const autores = await response.json();
    comprobar_sesion();

    llenar_biblioteca(autores);
}


async function comprobar_sesion() {
    const url = "http://localhost:3000/api/me";
    const result = await fetchear(url);
    if (result.ok){
        const usuario = await result.json();
        const { username, foto_perfil } = usuario;
        console.log(`username: ${username} foto: ${foto_perfil}`);
    }
    else {
        const error = await result.json();
        console.log(error);
    }
}





window.addEventListener('load', fetch_data);


