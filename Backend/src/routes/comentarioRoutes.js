import { Router } from "express";
import { postComentario, getComentarios } from "../controllers/comentariosController.js";

const router = Router();

router.get("/topico/:id_topico", getComentarios);
router.post("/topico/:id_topico", postComentario);

export default router;
