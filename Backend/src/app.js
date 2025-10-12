import express from "express";
import cors from "cors";
// import cursoRoutes from "./routes/cursoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import db from "./config/db.js";

const app = express();

// ===============================
// 🧩 MIDDLEWARES
// ===============================

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:5173", // permite solo tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // si necesitas enviar cookies
  })
);

app.use(express.json()); // para parsear JSON

// ===============================
// 🧭 RUTAS PRINCIPALES
// ===============================

// Rutas de cursos
// app.use("/api/curso", cursoRoutes);

// Rutas de autenticación y usuarios
app.use("/api/users", authRoutes);
app.use("/api/auth", authRoutes);

// ===============================
// 🔌 RUTA DE PRUEBA DE CONEXIÓN A LA BASE DE DATOS
// ===============================
app.get("/test-db", async (req, res) => {
  try {
    // Realizamos una consulta de prueba
    const result = await db.query("SELECT NOW()");
    res.json({
      message: "✅ Conexión exitosa a la base de datos",
      timestamp: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error al conectar con la base de datos",
      error: error.message,
    });
  }
});

// ===============================
// ⚠️ MANEJO GLOBAL DE ERRORES
// ===============================
app.use((err, req, res, next) => {
  console.error("Error detectado:", err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

export default app;
