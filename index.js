require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Endpoint 1: Saludo estático
app.get('/saludo', (req, res) => {
  res.send('Hola mundo');
});

// Endpoint 2: Saludo dinámico
app.get('/saludo/:nombre', (req, res) => {
  const { nombre } = req.params;

  res.json({
    mensaje: `Hola, ${nombre}! Bienvenido/a al taller de Express.`
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto http://localhost:${PORT}`);
});