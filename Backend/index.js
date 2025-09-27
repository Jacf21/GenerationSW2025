const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const app = express();

// Importa las rutas
const userRoutes = require('./routes/userRoutes');
//const authRoutes = require('./routes/authRoutes');
const cursoRoutes = require('./routes/cursoRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Enlaza las rutas 
app.use('/api/users', userRoutes);
//app.use('/api/auth', authRoutes);
app.use('/api/curso', cursoRoutes);

// Ruta de prueba para la conexión a la base de datos
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({
      message: 'Conexión exitosa a la base de datos',
      timestamp: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al conectar con la base de datos',
      error: error.message
    });
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error del servidor' });
});

const port = 5000;
// Prueba de conexión al iniciar el servidor
app.listen(port, async () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  try {
    const result = await db.query('SELECT NOW()');
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error.message);
  }
});