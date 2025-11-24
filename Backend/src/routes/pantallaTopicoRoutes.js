import express from "express";
import {
  crearPantalla,
  getPantalla,
  getPantallaPorTopico,
  actualizarPantalla,
} from "../controllers/pantallaTopicoController.js";

const router = express.Router();

router.post("/", crearPantalla);
router.get("/:id", getPantalla);
router.get("/topico/:id_topico", getPantallaPorTopico);
router.put("/:id", actualizarPantalla);

export default router;
