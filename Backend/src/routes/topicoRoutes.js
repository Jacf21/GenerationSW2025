import { Router } from "express";
import {
  crearTopico,
  obtenerTopico,
  obtenerTopicos,
  eliminarTopico,
} from "../controllers/topicosController.js";

const router = Router();

router.post("/create", crearTopico);
router.get("/get/:id", obtenerTopico);
router.get("/getall", obtenerTopicos);
router.get("/delete/:id", eliminarTopico);

export default router;
