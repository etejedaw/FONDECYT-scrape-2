import cheerio from "cheerio";
import Output from "../Output";
import Scraper from "../Scraper";

class EmergenciaYDesastresScraper extends Scraper {
	constructor(html: string, baseUrl: string) {
		super(html, baseUrl);
	}

	getData(): Output[] {
		const $ = cheerio.load(this.htmlCode);
		return $("main.cd-main-content .container .row .w-100.p-2.tit_seccion.p-4")
			.map((idx, elem) => {
				const title = $(elem).find("h2").text() || "";
				const output: Output = {
					title,
					link: this.baseUrl,
					format: "html"
				};
				return output;
			})
			.get();
	}
}

export default EmergenciaYDesastresScraper;
