import cheerio from "cheerio";
import Output from "../Output";

class Scraper {
	readonly #html: string;
	readonly #url: string;

	constructor(html: string, url: string) {
		this.#html = html;
		this.#url = url;
	}

	getData(): Output[] {
		const $ = cheerio.load(this.#html);
		return $("main.cd-main-content .container .row .w-100.p-2.tit_seccion.p-4")
			.map((idx, elem) => {
				const title = $(elem).find("h2").text() || "";
				const output: Output = {
					title,
					link: this.#url,
					format: "html"
				};
				return output;
			})
			.get();
	}
}

export default Scraper;
