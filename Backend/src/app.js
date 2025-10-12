import express from "express";
import cors from "cors";
import cursoRoutes from "./routes/cursoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:5173", // permite solo tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // si necesitas enviar cookies
  })
);

app.use(express.json()); // para parsear JSON

// Rutas
app.use("/api/curso", cursoRoutes);
app.use("/api/users", authRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res) => {
  console.error("Error detectado:", err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

export default app;
