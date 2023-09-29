import cheerio from "cheerio";
import Output from "../Output";

class Scraper {
	readonly #html: string;
	readonly #url: string;

	constructor(html: string, url: string) {
		this.#html = html;
		this.#url = url;
	}

	getETData(): Output[] {
		const $ = cheerio.load(this.#html);
		return $("#resultados-consulta .wrapper .row .col-md-12 h2 span")
			.map((idx, elem) => {
				const title = $(elem).text() || "";
				const output: Output = {
					title,
					link: this.#transformEtUrl(this.#url),
					format: "json"
				};
				return output;
			})
			.get();
	}

	getOSData(): Output[] | undefined {
		const $ = cheerio.load(this.#html);
		return $("section .container .row .col")
			.map((idx, elem) => {
				const title = $(elem).find("h2").text() || "";
				const output: Output = {
					title,
					link: this.#transformOSUrl(this.#url),
					format: "html"
				};
				return output;
			})
			.get()
			.filter(data => data.title);
	}

	#transformEtUrl(url: string): string {
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

	#transformOSUrl(url: string): string {
		const originalUrl = new URL(url);
		const search = originalUrl.search;
		const newUrl = new URL("reporpdf.html".concat(search), originalUrl);
		return newUrl.href;
	}
}

export default Scraper;
