const urlParams = new URLSearchParams(window.location.search);
const isbn_code = urlParams.get('isbn_code');

const url = `http://localhost:3000/api/libros/${isbn_code}`;
const default_icon = 'https://www.ipburger.com/wp-content/uploads/2023/06/Untitled-36-%C3%97-36-in-2023-05-20T120139.136-1024x1024-1.webp';

function estandarizar_info(libro){
    const campos  = ["fecha_publicacion", "descripcion", "numero_de_paginas", "idioma", "autor"];

    for (const campo of campos){
        if (libro[campo] === null){
            libro[campo] = "Desconocido";
        }
    }
    return {...libro};
}


function crear_info(libro){
    const libro_estandar = estandarizar_info(libro);
    const {
        titulo,
        fecha_publicacion,
        descripcion,
        numero_de_paginas,
        idioma,
        id_autor,
        etiquetas,
        id_etiqueta,
        autor
    } = libro_estandar;

    
    const contenedor = document.getElementById('contenedor-informacion');
    const informacion = document.createElement('div');
    informacion.classList.add('info-basica');

    // Titulo del libro
    const titulo_libro = document.createElement('h1');
    titulo_libro.classList.add('titulo-libro');
    titulo_libro.innerText = titulo;
    contenedor.appendChild(titulo_libro);

    //Autor con link
    const nombre_autor = document.createElement('h3');
    const link_autor = document.createElement('a');
    link_autor.href = (`/autor/?id_autor=${id_autor}`);
    link_autor.innerText = `Autor: ${autor}`;
    nombre_autor.appendChild(link_autor);

    //Info basica
    const publicacion = document.createElement('h3');
    publicacion.innerText = `Fecha de publicacion: ${fecha_publicacion}`;
    const n_paginas = document.createElement('h3');
    n_paginas.innerText = `Numero de paginas: ${numero_de_paginas}`;;
    const nombre_idioma = document.createElement('h3');
    nombre_idioma.innerText = `Idioma original: ${idioma}`;
    
    informacion.appendChild(nombre_autor);
    informacion.appendChild(publicacion);
    informacion.appendChild(n_paginas);
    informacion.appendChild(nombre_idioma);
    contenedor.appendChild(informacion);

        //Generos
    if (etiquetas !== null){
        const contenedor_generos = document.createElement('div');
        contenedor_generos.id = 'contenedor-generos';
        const generos = document.createElement('h3');
        generos.innerText = "Generos: ";
        contenedor_generos.appendChild(generos);
        
        for(const etiqueta of etiquetas){
            const genero = document.createElement('h3');
            const link_genero = document.createElement('a');
            link_genero.href = `/etiquetas/?id_etiqueta=${id_etiqueta}`;
            link_genero.innerText = etiqueta.nombre_etiqueta;
            genero.appendChild(link_genero);
            contenedor_generos.appendChild(genero);
        }
        informacion.appendChild(contenedor_generos)
    }

    //Descripcion libro
    const contenedor_bio = document.createElement('div');
    contenedor_bio.id = 'contenedor-bio';

    const ejemplo = document.createElement('h3');
    ejemplo.innerText = 'Sinopsis:';

    const bio = document.createElement('p');
    bio.id = 'biografia-autor';
    bio.innerText = descripcion;

    contenedor_bio.appendChild(ejemplo);
    contenedor_bio.appendChild(bio);
    contenedor.appendChild(contenedor_bio);
    
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


async function llenar_biblioteca(libros, libro_actual){
    const biblioteca = document.getElementById('contenedor-biblioteca');
    if (libros === null){
        const mensaje = document.createElement('h4');
        mensaje.innerText = "El autor no tiene mas libros";
        biblioteca.append(mensaje);
        return;
    }
    for (const libro of libros){
        if (libro.isbn_code !== libro_actual){
            const libro_creado = crear_libro(libro);
            biblioteca.appendChild(libro_creado);
        }
    }
    return;
}



function linkear_botones(libro){
    const boton_editar = document.getElementById('boton-editar');
    boton_editar.href = `./editar/?isbn_code=${libro.isbn_code}&titulo=${libro.titulo}`;

    const boton_borrar = document.getElementById('boton-borrar');
    boton_borrar.addEventListener("click", async () => {
        const confirmado = confirm("Desea eliminar este libro?");
        if (confirmado){
            const result = await fetch(url, {
                method: 'DELETE'
            })
            window.location.href = '/libros/'
        }
        else{ 
            return;
        }
    });
}

function crear_portada(portada){
    const contenedor = document.getElementById('contenedor-portada');   
    const imagen = document.createElement('img');
    imagen.classList.add('imagen-portada');
    if (portada === null){
        portada = default_icon;
    }
    imagen.src = portada;   
    contenedor.appendChild(imagen);
}

async function fetch_data() {
    const response = await fetch(url);
    const libro = await response.json();

    crear_portada(libro.imagen_portada);
    linkear_botones(libro);
    crear_info(libro);
    llenar_biblioteca(libro.libros_autor, libro.isbn_code);
 
    return;
}



window.addEventListener('load', fetch_data);