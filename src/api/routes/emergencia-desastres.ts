import { Router } from "express";
import { ScraperFactory } from "../../core/scraper-factory";

const router = Router();

router.get("/", (req, res) => {
	const indicators = ScraperFactory.getIndicators("emergencia-desastres");
	res.json({ indicators });
});

export default router;
