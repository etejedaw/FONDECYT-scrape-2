import { Getter, HtmlExtractor } from "../../htmlExtractor";
import Output from "../Output";
import EmergenciaYDesastresScraper from "./EmergenciaYDesastresScraper";
import DataExtractor from "../DataExtractor";

class EmergenciaYDesastres extends DataExtractor {
	readonly #url: string;

	constructor(url: string, extractor: HtmlExtractor) {
		super("https://emergenciaydesastres.mineduc.cl/", extractor);
		this.isCorrectUrl(url);
		this.#url = url;
	}

	async search(): Promise<Output[]> {
		return await this.innerSearch(this.#url);
	}

	async scraper(): Promise<EmergenciaYDesastresScraper | undefined> {
		const getter = await Getter.build(this.#url, this.extractor);
		const html = getter.html;
		if (!html) return;
		return new EmergenciaYDesastresScraper(html, this.#url);
	}
}

export default EmergenciaYDesastres;
