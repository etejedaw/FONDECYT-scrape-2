import { HtmlExtractor } from "../../htmlExtractor";
import Output from "../Output";

class EstadisticasTerritoriales {
	readonly #url: string;
	readonly #extractor: HtmlExtractor;

	constructor(url: string, extractor: HtmlExtractor) {
		this.#url = this.#checkUrl(url);
		this.#extractor = extractor;
	}

	async search(): Promise<Output[] | undefined> {
		return undefined;
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
