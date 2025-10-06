import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend funcionando 🚀" });
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
