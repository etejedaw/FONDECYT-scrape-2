import { Router } from "express";
import { ScraperFactory } from "../../core/ScraperFactory";

const router = Router();

router.get("/", (req, res) => {
	const scrapeFactory = ScraperFactory.getInstance();
	const indicators = scrapeFactory.getIndicators("emergencia-desastres");
	res.json({ indicators });
});

router.get("/:indicator", async (req, res) => {
	const indicator = req.params.indicator;
	const scrapeFactory = ScraperFactory.getInstance();
	const scraper = scrapeFactory.get("emergencia-desastres");
	const data = await scraper.init(indicator);
	return res.json({ data }).status(200);
});

export default router;
