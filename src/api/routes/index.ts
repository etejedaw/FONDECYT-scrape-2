import { Router } from "express";
import emergenciaDesastres from "./emergencia-desastres";

const router = Router();

router.use("/emergencia-desastres", emergenciaDesastres);

export default router;
