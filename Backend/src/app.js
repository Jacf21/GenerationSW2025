import express from "express";
import cors from "cors";
import cursoRoutes from "./routes/cursoRoutes.js";

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

export default app;
