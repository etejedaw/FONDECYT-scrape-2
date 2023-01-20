import cheerio from "cheerio";
import Output from "./Output";

class Scraper {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	getData(): Output[] {
		const $ = cheerio.load(this.#html);
		return $("nav .nav .text-white a")
			.map((idx, elem) => {
				const title = $(elem).attr("title");
				const link = $(elem).attr("href");
				return { title, link };
			})
			.get();
	}
}

export default Scraper;
