import express from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Ruta de prueba
app.get("/status", (req, res) => {
  res.json({ ok: true, message: "Servidor funcionando correctamente 🚀" });
});

// Obtener todos los libros
app.get("/libros", (req, res) => {
  const sql = `
    SELECT l.id, l.titulo, l.autor_id AS autorId, a.nombre AS autorNombre
    FROM libros l
    LEFT JOIN autores a ON a.id = l.autor_id
    ORDER BY l.id DESC
  `;
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).send("Error al obtener libros");
    res.json(results);
  });
});

// Obtener todos los autores
app.get("/autores", (req, res) => {
  connection.query("SELECT id, nombre FROM autores ORDER BY nombre ASC", (err, results) => {
    if (err) return res.status(500).send("Error al obtener autores");
    res.json(results);
  });
});

// Crear un nuevo libro
app.post("/libros", (req, res) => {
  const { titulo, autorId } = req.body;
  if (!titulo || !autorId) {
    return res.status(400).json({ message: "'titulo' y 'autorId' son obligatorios" });
  }

  connection.query(
    "INSERT INTO libros (titulo, autor_id) VALUES (?, ?)",
    [titulo, autorId],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error al crear libro" });
      res.status(201).json({ id: result.insertId, titulo, autorId: Number(autorId) });
    }
  );
});

// Actualizar un libro existente
app.put("/libros/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, autorId } = req.body;

  if (!titulo || !autorId) {
    return res.status(400).json({ message: "'titulo' y 'autorId' son obligatorios" });
  }

  connection.query(
    "UPDATE libros SET titulo = ?, autor_id = ? WHERE id = ?",
    [titulo, autorId, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error al actualizar libro" });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Libro no encontrado" });
      res.json({ id: Number(id), titulo, autorId: Number(autorId) });
    }
  );
});

// Eliminar un libro
app.delete("/libros/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM libros WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error al eliminar libro" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Libro no encontrado" });
    res.status(204).send();
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
