import cheerio from "cheerio";
import Output from "./Output";

class Scraper {
	readonly #html: string;
	readonly #baseUrl: string;

	constructor(html: string, baseUrl: string) {
		this.#html = html;
		this.#baseUrl = baseUrl;
	}

	getData(): Output[] {
		const $ = cheerio.load(this.#html);
		return $(".tab-content #estadisticas .table tbody tr")
			.map((idx, elem) => {
				const tds = $(elem).find("td");
				const title = $(tds[1]).text().trim();
				const href = $(tds[2]).find("a").attr("href")?.trim() ?? "";
				const link = `${this.#baseUrl}${href}`;
				return { title, link };
			})
			.get();
	}
}

export default Scraper;
