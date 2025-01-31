import { Router } from "express";
import { ScraperFactory } from "../../core/scraper-factory";

const router = Router();

router.get("/", (req, res) => {
	const indicators = ScraperFactory.getIndicators("emergencia-desastres");
	res.json({ indicators });
});

router.get("/:indicator", async (req, res) => {
	const indicator = req.params.indicator;
	const scraper = ScraperFactory.get("emergencia-desastres");
	const data = await scraper.init(indicator);
	return res.json({ data });
});

export default router;
