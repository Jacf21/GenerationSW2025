import express from "express";
import {
  agregarContenido,
  eliminarContenido,
  obtenerContenidos,
} from "../controllers/contenidoPantallaTopicoController.js";

const router = express.Router();

router.post("/", agregarContenido);
router.get("/pantalla/:id_pantalla", obtenerContenidos);
router.delete("/:id", eliminarContenido);

export default router;
