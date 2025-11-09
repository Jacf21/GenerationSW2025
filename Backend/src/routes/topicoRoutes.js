import { Router } from "express";
import {
  crearTopico,
  obtenerTopicos,
  obtenerTopico,
  actualizarTopico,
  eliminarTopico,
} from "../controllers/topicosController.js";

const router = Router();

router.post("/create", crearTopico);
router.get("/getall", obtenerTopicos);
router.get("/get/:id", obtenerTopico);
router.put("/update/:id", actualizarTopico);
router.delete("/delete/:id", eliminarTopico);

export default router;
