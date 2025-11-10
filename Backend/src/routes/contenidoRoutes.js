import { Router } from "express";
import multer from "multer";
import {
  crearContenido,
  eliminarContenido,
  obtenerContenidosPorTopico,
  obtenerContenidos,
} from "../controllers/contenidoController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

const router = Router();

router.post("/up", upload.single("archivo"), crearContenido);
router.delete("/delete/:id", eliminarContenido);
router.get("/topico/:id_topico", obtenerContenidosPorTopico);
router.get("/all", obtenerContenidos);

export default router;
