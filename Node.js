// server.js (idea base)
app.post("/contacto", (req, res) => {
  const {nombre, email, mensaje} = req.body;
  
  // guardar en base de datos
  console.log(nombre, email, mensaje);

  res.send("OK");
});n