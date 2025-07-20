CREATE TABLE paises (
id_pais SERIAL PRIMARY KEY,
nombre_pais TEXT NOT NULL
);

CREATE TABLE idiomas (
id_idioma SERIAL PRIMARY KEY,
nombre_idioma TEXT NOT NULL
);

CREATE TABLE usuarios (
nombre_usuario VARCHAR(32) PRIMARY KEY, 
contrasenia_encriptada TEXT NOT NULL,
foto_perfil TEXT,
nombre TEXT NOT NULL,
bio TEXT
);

CREATE TABLE autores (
id_autor SERIAL PRIMARY KEY,
nombre_completo TEXT NOT NULL,
nacionalidad INT REFERENCES paises (id_pais) ON DELETE SET NULL,
fecha_nacimiento DATE,
retrato TEXT
);

CREATE TABLE libros (
isbn_code INT PRIMARY KEY,  
titulo TEXT NOT NULL,
fecha_publicacion DATE,
descripcion TEXT NOT NULL,
numero_de_paginas INT NOT NULL,
imagen_portada TEXT,
idioma_id INT DEFAULT 1 NOT NULL REFERENCES idiomas (id_idioma) ON DELETE SET DEFAULT

);

CREATE TABLE bibliotecas (
id_biblioteca SERIAL PRIMARY KEY,
nombre_usuario_propietario VARCHAR(32) REFERENCES usuarios(nombre_usuario) ON DELETE SET NULL,
nombre_biblioteca TEXT NOT NULL,
icono TEXT
);

CREATE TABLE biblioteca_libro (
id_biblioteca INT REFERENCES bibliotecas (id_biblioteca) ON DELETE CASCADE,
isbn_code INT REFERENCES libros (isbn_code) ON DELETE CASCADE,
PRIMARY KEY (id_biblioteca, isbn_code)
);

CREATE TABLE etiquetas (
id_etiqueta SERIAL PRIMARY KEY,
nombre_etiqueta VARCHAR(20) NOT NULL
);

CREATE TABLE seguidos (
nombre_usuario_seguidor VARCHAR(32) REFERENCES usuarios (nombre_usuario) ON DELETE CASCADE,
nombre_usuario_seguido VARCHAR(32) REFERENCES usuarios (nombre_usuario) ON DELETE CASCADE,
PRIMARY KEY (nombre_usuario_seguidor, nombre_usuario_seguido)
);

CREATE TABLE resenias (
nombre_usuario varchar(32) REFERENCES usuarios(nombre_usuario) ON DELETE CASCADE,
isbn_code int REFERENCES libros(isbn_code) ON DELETE CASCADE,
PRIMARY KEY (nombre_usuario, isbn_code),
calificacion INT NOT NULL CHECK (calificacion >= 0 AND calificacion <= 10),
body TEXT 
);

CREATE TABLE libros_autor (
id_autor INT DEFAULT 1 REFERENCES autores (id_autor) ON DELETE SET DEFAULT,
isbn_code int REFERENCES libros(isbn_code) ON DELETE CASCADE,
PRIMARY KEY (id_autor, isbn_code)
);

CREATE TABLE etiquetas_libros (
id_etiqueta INT REFERENCES etiquetas (id_etiqueta) ON DELETE CASCADE,
isbn_code int REFERENCES libros(isbn_code) ON DELETE CASCADE,
PRIMARY KEY (id_etiqueta, isbn_code)
);