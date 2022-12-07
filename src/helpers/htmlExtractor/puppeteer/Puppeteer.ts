import puppeteer from "puppeteer";
import HtmlExtractor from "../htmlExtractor.intereface";

class Puppeteer implements HtmlExtractor {
	async get(url: string): Promise<string> {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(url);
		return await page.content();
	}
}

export default Puppeteer;
