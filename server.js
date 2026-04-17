const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const db = new sqlite3.Database("./database.db");

db.run(`
CREATE TABLE IF NOT EXISTS mensajes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  email TEXT,
  mensaje TEXT
)
`);

// CONTACTO
app.post("/contacto", (req, res) => {
  const { nombre, email, mensaje } = req.body;

  db.run(
    "INSERT INTO mensajes (nombre, email, mensaje) VALUES (?, ?, ?)",
    [nombre, email, mensaje],
    () => res.json({ ok: true })
  );
});

// ADMIN (ver mensajes)
app.get("/mensajes", (req, res) => {
  db.all("SELECT * FROM mensajes ORDER BY id DESC", [], (err, rows) => {
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor en puerto", PORT);
});