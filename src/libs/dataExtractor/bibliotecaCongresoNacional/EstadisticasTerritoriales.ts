import { Getter, HtmlExtractor } from "../../htmlExtractor";
import Output from "../Output";
import Scraper from "./Scraper";

class EstadisticasTerritoriales {
	readonly #url: string;
	readonly #extractor: HtmlExtractor;

	constructor(url: string, extractor: HtmlExtractor) {
		this.#url = this.#checkUrl(url);
		this.#extractor = extractor;
	}

	async search(): Promise<Output[] | undefined> {
		const getter = await Getter.build(this.#url, this.#extractor);
		const html = getter.html;
		if (!html) return;
		const scraper = new Scraper(html, this.#url);
		return scraper.getETData();
	}

	#checkUrl(url: string): string {
		const BASE_URL = "https://www.bcn.cl/siit/estadisticasterritoriales/";
		const baseUrl = new URL(BASE_URL);
		const inputUrl = new URL(url);
		if (baseUrl.origin !== inputUrl.origin)
			throw new Error("Input url does not match BCN url");
		return url;
	}
}

export default EstadisticasTerritoriales;
