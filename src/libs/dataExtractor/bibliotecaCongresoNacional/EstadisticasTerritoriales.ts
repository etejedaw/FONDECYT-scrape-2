import { Getter, HtmlExtractor } from "../../htmlExtractor";
import Output from "../Output";
import DataExtractor from "../DataExtractor";
import EstadisticasTerritorialesScraper from "./EstadisticasTerritorialesScraper";

class EstadisticasTerritoriales extends DataExtractor {
	readonly #url: string;

	constructor(url: string, extractor: HtmlExtractor) {
		super("https://www.bcn.cl/siit/estadisticasterritoriales/", extractor);
		this.isCorrectUrl(url);
		this.#url = url;
	}

	async search(): Promise<Output[]> {
		return await this.innerSearch(this.#url);
	}

	async scraper(): Promise<EstadisticasTerritorialesScraper | undefined> {
		const getter = await Getter.build(this.#url, this.extractor);
		const html = getter.html;
		if (!html) return;
		return new EstadisticasTerritorialesScraper(html, this.#url);
	}
}

export default EstadisticasTerritoriales;
