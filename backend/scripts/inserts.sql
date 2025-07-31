
-- Países
INSERT INTO paises (nombre_pais) VALUES
('Argentina'),
('Estados Unidos'),
('Reino Unido'),
('Francia'),
('Japón');

-- Idiomas
INSERT INTO idiomas (nombre_idioma) VALUES
('Español'),
('Inglés'),
('Francés'),
('Japonés'),
('Alemán');

-- Usuarios
INSERT INTO usuarios (nombre_usuario, contrasenia_encriptada, foto_perfil, nombre, bio) VALUES
('luna23', '1234hash', NULL, 'Luna Martínez', 'Amante de los libros'),
('mario_dev', 'abcdhash', NULL, 'Mario Gómez', 'Frontend dev y lector'),
('susanita', 'susanpass', NULL, 'Susana López', 'Fan de la poesía'),
('akira88', 'pass123', NULL, 'Akira Tanaka', 'Lectura y café'),
('clara_books', 'bookish', NULL, 'Clara Ruiz', 'Bibliotecaria');

-- Autores
INSERT INTO autores (nombre_completo, nacionalidad, fecha_nacimiento, retrato) VALUES
('Gabriel García Márquez', 1, '1927-03-06', 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Gabriel_Garcia_Marquez.jpg'),
('J.K. Rowling', 3, '1965-07-31', 'https://www.jkrowling.com/wp-content/uploads/2022/05/J.K.-Rowling-2021-Photography-Debra-Hurford-Brown-scaled.jpg'),
('Haruki Murakami', 5, '1949-01-12', 'https://images2.penguinrandomhouse.com/author/21587'),
('Julio Cortázar', 1, '1914-08-26', 'https://www.fundacionkonex.org/custom/web/data/imagenes/repositorio/2010/6/1/1067/2016031611065369a5b5995110b36a9a347898d97a610e.jpg'),
('George Orwell', 3, '1903-06-25', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/George_Orwell%2C_c._1940_%2841928180381%29.jpg/960px-George_Orwell%2C_c._1940_%2841928180381%29.jpg'),
('Jane Austen', 3, '1775-12-16', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHX0seiiRzacvY_R7qY4OYDd186sRV1jqaFg&s'),
('Albert Camus', 4, '1913-11-07', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThwr8BSKn9eqbK3g4wasUObkpBtIs0l0AYtA&s'),
('Ray Bradbury', 2, '1920-08-22', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Ray_Bradbury_%281975%29_-cropped-.jpg/960px-Ray_Bradbury_%281975%29_-cropped-.jpg'),
('Margaret Atwood', 2, '1939-11-18', 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Margaret_Atwood_%2852161564186%29_%28cropped%29.jpg'),
('Borges', 1, '1899-08-24', 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Jorge_Luis_Borges_1951%2C_by_Grete_Stern.jpg');

INSERT INTO libros (
  isbn_code, titulo, id_autor, fecha_publicacion, descripcion, numero_de_paginas, imagen_portada, idioma_id
) VALUES
(1001, 'Cien Años de Soledad', 1, '1967-06-05', 'Realismo mágico en Macondo', 417, 'https://www.rae.es/sites/default/files/portada_cien_anos_de_soledad_0.jpg', 1),
(1002, 'Harry Potter y la piedra filosofal', 2, '1997-06-26', 'Un niño descubre que es mago', 223, 'https://images.cdn3.buscalibre.com/fit-in/360x360/ce/e6/cee6ef96dad70d3f599b953f0e50afc7.jpg', 1),
(1003, 'Kafka en la orilla', 3, '2002-09-12', 'Realismo mágico japonés', 505, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg6zn3On64pRBVtmBDnsb1W1AjNCoHs1zdYQ&s', 4),
(1004, 'Rayuela', 4, '1963-06-28', 'Una novela abierta a la interpretación', 600, 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Rayuela_JC.png', 1),
(1005, '1984', 5, '1949-06-08', 'Distopía totalitaria', 328, 'https://contentv2.tap-commerce.com/cover/large/9788446052654_1.jpg?id_com=1156', 2),
(1006, 'Orgullo y prejuicio', 6, '1813-01-28', 'Romance y crítica social', 432, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvC-ihcGdtkATFpKMUIRRVmO2-fBwZ6Axkvw&s', 2),
(1007, 'El extranjero', 7, '1942-01-01', 'Existencialismo francés', 123, 'https://acdn-us.mitiendanube.com/stores/746/904/products/portada_el-extranjero-ne_albert-camus_202405100041-ab9f61668a11fa453f17268580398993-1024-1024.jpg', 3),
(1008, 'Fahrenheit 451', 8, '1953-10-19', 'Sociedad sin libros', 158, 'https://images.cdn2.buscalibre.com/fit-in/360x360/9e/39/9e3949c949c4abc1f69e2cce613532b1.jpg', 2),
(1009, 'El cuento de la criada', 9, '1985-08-01', 'Distopía feminista', 311, 'https://images.cdn3.buscalibre.com/fit-in/360x360/f3/c9/f3c9b4e6308b7efefb72681b646294a0.jpg', 2),
(1010, 'Ficciones', 10, '1944-01-01', 'Relatos filosóficos', 170, 'https://images.cdn3.buscalibre.com/fit-in/360x360/46/85/4685286dbc1ec2013245afe1d537acfb.jpg', 1),
(1011, 'Crónica de una muerte anunciada', 1, '1981-01-01', 'Una muerte anticipada', 120, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBB864HsyzicB97xFq5mb1FSzaRiatzGNe_g&s', 1),
(1012, 'Harry Potter y la cámara secreta', 2, '1998-07-02', 'Segunda entrega del mago', 251, 'https://tavapy.gov.py/biblioteca/wp-content/uploads/2022/03/71ff77s0XoL-1.jpg', 1),
(1013, 'Tokio Blues', 3, '1987-09-04', 'Amor y pérdida', 296, 'https://www.planetadelibros.com.ar/usuaris/libros/thumbs/f0b73733-5767-4bc3-9a51-c60ea115639d/d_295_510/91988_tokio-blues-norwegian-wood_9788483103074.webp', 4),
(1014, 'Bestiario', 4, '1951-01-01', 'Relatos de lo extraño', 180, 'https://fce.com.ar/wp-content/uploads/2023/05/9786077453819.jpg', 1),
(1015, 'Rebelión en la granja', 5, '1945-08-17', 'Fábula política', 112, 'https://images.cdn3.buscalibre.com/fit-in/360x360/36/12/3612339f9bf704aadacdd90b34723246.jpg', 2),
(1016, 'Emma', 6, '1815-12-23', 'Retrato de una mujer joven', 474, 'https://www.planetadelibros.com.ar/usuaris/libros/fotos/360/original/359510_portada_emma_jane-austen_202206131223.jpg', 2),
(1017, 'La peste', 7, '1947-06-10', 'Peste en Argel', 308, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSfzuRYlVb6yCgYiJEnR2YTtKcTT068JvrMw&s', 3),
(1018, 'El hombre ilustrado', 8, '1951-01-01', 'Cuentos de ciencia ficción', 270, 'https://www.crisol.com.pe/media/catalog/product/cache/cf84e6047db2ba7f2d5c381080c69ffe/e/l/el-hombre-ilustrado_gic2phsekuqhztsl.jpg', 2),
(1019, 'Oryx y Crake', 9, '2003-05-01', 'Biotecnología y catástrofe', 376, 'https://http2.mlstatic.com/D_NQ_NP_929850-MLA83391459714_042025-O.webp', 2),
(1020, 'El Aleph', 10, '1949-01-01', 'Un punto que contiene todo', 157, 'https://acdn-us.mitiendanube.com/stores/004/088/117/products/526276-89085513a3228322a417401963950459-1024-1024.jpg', 1);

-- Etiquetas
INSERT INTO etiquetas (nombre_etiqueta) VALUES
('Distopía'),
('Romance'),
('Realismo Mágico'),
('Filosofía'),
('Ciencia Ficción');

-- Etiquetas por libro
INSERT INTO etiquetas_libros (id_etiqueta, isbn_code) VALUES
(1, 1005),
(1, 1009),
(1, 1015),
(1, 1019),
(2, 1006),
(2, 1013),
(3, 1001),
(3, 1003),
(3, 1014),
(4, 1007),
(4, 1017),
(4, 1020),
(5, 1008),
(5, 1018);

-- Reseñas
INSERT INTO resenias (nombre_usuario, isbn_code, calificacion, body) VALUES
('luna23', 1001, 9, 'Una obra maestra.'),
('mario_dev', 1005, 8, 'Da miedo lo actual que se siente.'),
('susanita', 1014, 10, 'Me fascinan los cuentos raros.'),
('akira88', 1003, 9, 'Murakami nunca falla.'),
('clara_books', 1010, 10, 'Filosofía y literatura en su máximo nivel.');

-- Biblioteca
INSERT INTO bibliotecas (nombre_usuario_propietario, nombre_biblioteca) VALUES
('luna23', 'Favoritos'),
('mario_dev', 'Distopías'),
('susanita', 'Extraños'),
('akira88', 'Japón'),
('clara_books', 'Filosofía');

--Biblioteca a libros

INSERT INTO biblioteca_libro (id_biblioteca, isbn_code) VALUES
(1, 1001),
(1, 1010),
(1, 1006),
(2, 1020),
(2, 1002),
(3, 1005),
(3, 1006),
(4, 1017),
(4, 1018);