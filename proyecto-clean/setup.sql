-- Borrar todo primero (si es posible)
DELETE FROM libros;
DELETE FROM autores;

-- Insertar autores
INSERT INTO autores (id, nombre) VALUES
(1, 'Gabriel García Márquez'),
(2, 'Mario Vargas Llosa'),
(3, 'Isabel Allende'),
(4, 'Jorge Luis Borges'),
(5, 'Pablo Neruda');

-- Insertar libros
INSERT INTO libros (titulo, autor_id) VALUES
('Cien años de soledad', 1),
('El amor en los tiempos del cólera', 1),
('La ciudad y los perros', 2),
('La casa de los espíritus', 3),
('Ficciones', 4),
('Veinte poemas de amor', 5);
