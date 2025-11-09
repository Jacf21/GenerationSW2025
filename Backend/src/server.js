import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import topicoRoutes from "./routes/topicoRoutes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // <= necesario para leer JSON en POST

// montar rutas
app.use("/api/topico", topicoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
