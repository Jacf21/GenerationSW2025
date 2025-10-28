import express from "express";
import cors from "cors";
import cursoRoutes from "./routes/cursoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contenidoRoutes from "./routes/contenidoRoutes.js";
import topicoRoutes from "./routes/topicoRoutes.js";

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api/contenido") && req.method === "POST") {
    // Multer procesará esta ruta
    next();
  } else {
    express.json({ limit: "50mb" })(req, res, next);
  }
});

app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api/contenido") && req.method === "POST") {
    next();
  } else {
    express.urlencoded({ limit: "50mb", extended: true })(req, res, next);
  }
});

// Rutas
app.use("/api/curso", cursoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/topico", topicoRoutes);
app.use("/api/contenido", contenidoRoutes);

// 404 para rutas no existentes
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Middleware de manejo de errores global
app.use((err, req, res) => {
  console.error("Error detectado:", err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

export default app;
