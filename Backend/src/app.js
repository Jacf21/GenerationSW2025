import express from "express";
import cors from "cors";
import cursoRoutes from "./routes/cursoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contenidoRoutes from "./routes/contenidoRoutes.js";
import topicoRoutes from "./routes/topicoRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api/contenido") && req.method === "POST") {
    return next();
  }

  express.json({ limit: "50mb" })(req, res, next);
});

app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api/contenido") && req.method === "POST") {
    return next();
  }

  express.urlencoded({ limit: "50mb", extended: true })(req, res, next);
});

app.use("/api/curso", cursoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/topico", topicoRoutes);
app.use("/api/contenido", contenidoRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.use((err, req, res) => {
  console.error("Error detectado:", err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

export default app;
