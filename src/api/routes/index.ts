import { Router } from "express";
import emergenciaDesastres from "./emergencia-desastres.route";

const router = Router();

router.use("/emergencia-desastres", emergenciaDesastres);

export default router;
