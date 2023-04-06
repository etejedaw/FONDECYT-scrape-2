import { Getter, HtmlExtractor } from "../../htmlExtractor";
import Output from "../Output";
import Scraper from "./Scraper";

class EmergenciaYDesastres {
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
		return scraper.getData();
	}

	#checkUrl(url: string): string {
		const BASE_URL = "https://emergenciaydesastres.mineduc.cl/";
		const baseUrl = new URL(BASE_URL);
		const inputUrl = new URL(url);
		if (baseUrl.origin !== inputUrl.origin)
			throw new Error("Input url does not match Emergencia y Desastres url");
		return url;
	}
}

export default EmergenciaYDesastres;
