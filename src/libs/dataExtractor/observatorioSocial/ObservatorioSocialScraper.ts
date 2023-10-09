import cheerio from "cheerio";
import Output from "../Output";
import slug from "slug";
import Scraper from "../Scraper";

class ObservatorioSocialScraper extends Scraper {
	constructor(html: string, baseUrl: string) {
		super(html, baseUrl);
	}

	getData(): Output[] {
		const $ = cheerio.load(this.htmlCode);
		return $(".tab-content #estadisticas .table tbody tr")
			.map((idx, elem) => {
				const tds = $(elem).find("td");
				const title = $(tds[1]).text().trim();
				const href = $(tds[2]).find("a").attr("href")?.trim() ?? "";
				const link = `${this.baseUrl}${href}`;
				const output: Output = {
					title,
					code: slug(title),
					link,
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

export default ObservatorioSocialScraper;
