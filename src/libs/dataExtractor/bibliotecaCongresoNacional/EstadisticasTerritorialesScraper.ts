import Scraper from "../Scraper";
import Output from "../Output";
import cheerio from "cheerio";

class EstadisticasTerritorialesScraper extends Scraper {
	constructor(html: string, baseUrl: string) {
		super(html, baseUrl);
	}

	getData(): Output[] {
		const $ = cheerio.load(this.htmlCode);
		return $("#resultados-consulta .wrapper .row .col-md-12 h2 span")
			.map((idx, elem) => {
				const title = $(elem).text() || "";
				const output: Output = {
					title,
					link: this.baseUrl,
					outputLink: this.#transformUrl(this.baseUrl),
					format: "json"
				};
				return output;
			})
			.get();
	}

	#transformUrl(url: string): string {
		const originalUrl = new URL(url);
		const newPathname = originalUrl.pathname.replace(
			"resultados-consulta",
			"descargar-resultados"
		);
		const id = originalUrl.searchParams.get("id") || "";
		const data = "datos.json";
		const newUrl = new URL(
			newPathname.concat("/").concat(id).concat("/").concat(data),
			originalUrl
		);
		return newUrl.href;
	}
}

export default EstadisticasTerritorialesScraper;
