function crear_contenedor(libro){
    const {
        isbn_code,
        titulo,
        imagen_portada
    } = libro;

    const default_icon = 'https://www.ipburger.com/wp-content/uploads/2023/06/Untitled-36-%C3%97-36-in-2023-05-20T120139.136-1024x1024-1.webp';

    const link = document.createElement('a');
    link.href = (`../libros/?isbn_code=${isbn_code}`);

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

    const nombre_autor = document.createElement('p');
    nombre_autor.classList.add('titulo_libro');
    nombre_autor.innerText = titulo;
    contenedor_nombre.appendChild(nombre_autor);

    return link;
}
