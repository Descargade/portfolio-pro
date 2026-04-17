const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const db = new sqlite3.Database("./database.db");

db.run(`
CREATE TABLE IF NOT EXISTS mensajes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  email TEXT,
  mensaje TEXT
)
`);

app.post("/contacto", (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  db.run(
    "INSERT INTO mensajes (nombre, email, mensaje) VALUES (?, ?, ?)",
    [nombre, email, mensaje],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Error DB" });
      }
      res.json({ ok: true });
    }
  );
});

app.get("/mensajes", (req, res) => {
  db.all("SELECT * FROM mensajes", [], (err, rows) => {
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});