import Scraper from "../Scraper";
import Output from "../Output";
import cheerio from "cheerio";

class ReporteComunalScraper extends Scraper {
	constructor(html: string, baseUrl: string) {
		super(html, baseUrl);
	}

	getData(): Output[] {
		const $ = cheerio.load(this.htmlCode);
		return $("section .container .row .col")
			.map((idx, elem) => {
				const title = $(elem).find("h2").text() || "";
				const output: Output = {
					title,
					link: this.baseUrl,
					outputLink: this.#transformUrl(this.baseUrl),
					format: "html/pdf"
				};
				return output;
			})
			.get()
			.filter(data => data.title);
	}

	#transformUrl(url: string): string {
		const originalUrl = new URL(url);
		const search = originalUrl.search;
		const newUrl = new URL("reporpdf.html".concat(search), originalUrl);
		return newUrl.href;
	}
}

export default ReporteComunalScraper;
