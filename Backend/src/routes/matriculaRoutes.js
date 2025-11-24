import { Router } from "express";
import { enrollByCode, getMisMatriculas } from "../controllers/matriculaController.js";

const router = Router();

router.post("/enroll", enrollByCode);
router.get("/:id_usuario/mis-matriculas", getMisMatriculas);

export default router;