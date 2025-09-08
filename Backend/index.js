const express = require('express');
const cors = require('cors');
const app = express();

// Importa las rutas
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Enlaza las rutas 
app.use('/api/users', userRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});