const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
app.use(express.json());

// Conexión a la base de datos
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "", // tu contraseña
  database: "biblioteca",
};

app.get("/autores", async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute("SELECT id, nombre FROM autores");
    await conn.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/libros", async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute(`
      SELECT l.id, l.titulo, l.autor_id AS autorId, a.nombre AS autorNombre
      FROM libros l
      LEFT JOIN autores a ON l.autor_id = a.id
    `);
    await conn.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/libros", async (req, res) => {
  const { titulo, autorId } = req.body;
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(
      "INSERT INTO libros (titulo, autor_id) VALUES (?, ?)",
      [titulo, autorId || null]
    );
    await conn.end();
    res.json({ id: result.insertId, titulo, autorId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/libros/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, autorId } = req.body;
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.execute(
      "UPDATE libros SET titulo=?, autor_id=? WHERE id=?",
      [titulo, autorId || null, id]
    );
    await conn.end();
    res.json({ id, titulo, autorId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/libros/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.execute("DELETE FROM libros WHERE id=?", [id]);
    await conn.end();
    res.json({ message: "Libro eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
