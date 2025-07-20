
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
('Gabriel García Márquez', 1, '1927-03-06', NULL),
('J.K. Rowling', 3, '1965-07-31', NULL),
('Haruki Murakami', 5, '1949-01-12', NULL),
('Julio Cortázar', 1, '1914-08-26', NULL),
('George Orwell', 3, '1903-06-25', NULL),
('Jane Austen', 3, '1775-12-16', NULL),
('Albert Camus', 4, '1913-11-07', NULL),
('Ray Bradbury', 2, '1920-08-22', NULL),
('Margaret Atwood', 2, '1939-11-18', NULL),
('Borges', 1, '1899-08-24', NULL);

-- Libros
INSERT INTO libros (isbn_code, titulo, fecha_publicacion, descripcion, numero_de_paginas, imagen_portada, idioma_id) VALUES
(1001, 'Cien Años de Soledad', '1967-06-05', 'Realismo mágico en Macondo', 417, NULL, 1),
(1002, 'Harry Potter y la piedra filosofal', '1997-06-26', 'Un niño descubre que es mago', 223, NULL, 1),
(1003, 'Kafka en la orilla', '2002-09-12', 'Realismo mágico japonés', 505, NULL, 4),
(1004, 'Rayuela', '1963-06-28', 'Una novela abierta a la interpretación', 600, NULL, 1),
(1005, '1984', '1949-06-08', 'Distopía totalitaria', 328, NULL, 2),
(1006, 'Orgullo y prejuicio', '1813-01-28', 'Romance y crítica social', 432, NULL, 2),
(1007, 'El extranjero', '1942-01-01', 'Existencialismo francés', 123, NULL, 3),
(1008, 'Fahrenheit 451', '1953-10-19', 'Sociedad sin libros', 158, NULL, 2),
(1009, 'El cuento de la criada', '1985-08-01', 'Distopía feminista', 311, NULL, 2),
(1010, 'Ficciones', '1944-01-01', 'Relatos filosóficos', 170, NULL, 1),
(1011, 'Crónica de una muerte anunciada', '1981-01-01', 'Una muerte anticipada', 120, NULL, 1),
(1012, 'Harry Potter y la cámara secreta', '1998-07-02', 'Segunda entrega del mago', 251, NULL, 1),
(1013, 'Tokio Blues', '1987-09-04', 'Amor y pérdida', 296, NULL, 4),
(1014, 'Bestiario', '1951-01-01', 'Relatos de lo extraño', 180, NULL, 1),
(1015, 'Rebelión en la granja', '1945-08-17', 'Fábula política', 112, NULL, 2),
(1016, 'Emma', '1815-12-23', 'Retrato de una mujer joven', 474, NULL, 2),
(1017, 'La peste', '1947-06-10', 'Peste en Argel', 308, NULL, 3),
(1018, 'El hombre ilustrado', '1951-01-01', 'Cuentos de ciencia ficción', 270, NULL, 2),
(1019, 'Oryx y Crake', '2003-05-01', 'Biotecnología y catástrofe', 376, NULL, 2),
(1020, 'El Aleph', '1949-01-01', 'Un punto que contiene todo', 157, NULL, 1);

-- Libros por autor
INSERT INTO libros_autor (id_autor, isbn_code) VALUES
(1, 1001),
(2, 1002),
(3, 1003),
(4, 1004),
(5, 1005),
(6, 1006),
(7, 1007),
(8, 1008),
(9, 1009),
(10, 1010),
(1, 1011),
(2, 1012),
(3, 1013),
(4, 1014),
(5, 1015),
(6, 1016),
(7, 1017),
(8, 1018),
(9, 1019),
(10, 1020);

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