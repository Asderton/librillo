const urlParams = new URLSearchParams(window.location.search);
const id_autor = urlParams.get('id_autor');

const url = `http://localhost:3000/api/autores/${id_autor}`;
const default_icon = 'https://www.ipburger.com/wp-content/uploads/2023/06/Untitled-36-%C3%97-36-in-2023-05-20T120139.136-1024x1024-1.webp';

function crear_retrato(retrato){
    const contenedor = document.getElementById('contenedor-retrato-autor');   

    const imagen = document.createElement('img');
    imagen.classList.add('imagen-retrato');

    if (retrato === null){
        retrato = default_icon;
    }
    imagen.src = retrato;
    
    contenedor.appendChild(imagen);
    return;
}

function crear_info(autor){
    const {
        nombre_completo,
        nombre_pais,
        fecha_nacimiento
    } = autor;

    const contenedor = document.getElementById('contenedor-informacion');

    // Nombre autor
    const nombre = document.createElement('h1');
    nombre.classList.add('nombre-autor');
    nombre.innerText = nombre_completo;
    contenedor.appendChild(nombre);

    // Fecha nacimiento y nacionalidad
    const nacionalidad = document.createElement('h3');
    nacionalidad.innerText = `Nacionalidad: ${nombre_pais}`;

    const nacimiento = document.createElement('h3');
    if (fecha_nacimiento === null){
        nacimiento.innerText = `Fecha de nacimiento: Desconocida`;
    }
    else{
         nacimiento.innerText = `Fecha de nacimiento: ${fecha_nacimiento}`;
    }
   
    const informacion = document.createElement('div');
    informacion.classList.add('info-basica');
    informacion.appendChild(nacionalidad);
    informacion.appendChild(nacimiento);
    contenedor.appendChild(informacion);

    //biografia
    const contenedor_bio = document.createElement('div');
    contenedor_bio.id = 'contenedor-bio';

    const titulo = document.createElement('h3');
    titulo.innerText = 'Biografia:';

    const bio = document.createElement('p');
    bio.id = 'biografia-autor';
    bio.innerText = " AUN NO ESTA IMPLEMENTADA LA BIO EN LA BDD XD";

    contenedor_bio.appendChild(titulo);
    contenedor_bio.appendChild(bio);
    contenedor.appendChild(contenedor_bio);
    
}


function crear_contenedor(autor) {
    crear_retrato(autor.retrato);
    crear_info(autor);
    return;
}


async function fetch_data() {
    const response = await fetch(url);
    const autor = await response.json();
    crear_contenedor(autor);
    llenar_biblioteca(autor.libros);
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



window.addEventListener('load', fetch_data);


