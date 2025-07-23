const urlParams = new URLSearchParams(window.location.search);
const id_autor = urlParams.get('isbn_code');

const url = `http://localhost:3000/api/libros/${isbn_code}`;
const default_icon = 'https://www.ipburger.com/wp-content/uploads/2023/06/Untitled-36-%C3%97-36-in-2023-05-20T120139.136-1024x1024-1.webp';

function crear_portada(retrato){
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
    console.log(typeof fecha_nacimiento)
    nacimiento.innerText = `Fecha de nacimiento: ${fecha_nacimiento}`;
   
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

// CREATE TABLE libros (
// isbn_code INT PRIMARY KEY,  
// titulo TEXT NOT NULL,
// fecha_publicacion DATE,
// descripcion TEXT NOT NULL,
// numero_de_paginas INT NOT NULL,
// imagen_portada TEXT,
// idioma_id INT DEFAULT 1 NOT NULL REFERENCES idiomas (id_idioma) ON DELETE SET DEFAULT
// );



async function fetch_data() {
    const response = await fetch(url);
    const libro = await response.json();

    const {
        isbn_code,
        titulo,
        fecha_publicacion,
        descripcion,
        numero_de_paginas,
        imagen_portada,
        idioma
    } = libro

    crear_portada(libro);
    crear_info(libro);
    // llenar_resenias??
    return;
}