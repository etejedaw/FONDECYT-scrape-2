import cheerio from "cheerio";
import Output from "../Output";
import Scraper from "../Scraper";

class DataSocialScraper extends Scraper {
	constructor(html: string, baseUrl: string) {
		super(html, baseUrl);
	}

	getData(): Output[] {
		// TODO: Esta sección debe ser implementada nuevamente, ya que debido a los constantes
		//  cambios de la página, la versión actual de scrape está obsoleta
		const $ = cheerio.load(this.htmlCode);
		return $("nav .nav .text-white a")
			.map((idx, elem) => {
				const title = $(elem).attr("title")?.trim() || "";
				const outputLink = $(elem).attr("href")?.trim() || "";
				const output: Output = {
					title,
					link: this.baseUrl,
					outputLink,
					format: "xlsx"
				};
				return output;
			})
			.get()
			.filter(output => this.#existOutput(output));
	}

	#existOutput(output: Partial<Output>): boolean {
		return Boolean(output.title) && Boolean(output.format);
	}
}

export default DataSocialScraper;
