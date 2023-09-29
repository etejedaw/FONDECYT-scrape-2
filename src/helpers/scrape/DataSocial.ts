import { HtmlExtractor } from "../../libs/htmlExtractor";
import { DataSocial as DS } from "../../libs/dataExtractor";

class DataSocial {
	readonly #url: string[];
	readonly #extractor: HtmlExtractor;

	constructor(url: string[] | string, extractor: HtmlExtractor) {
		this.#url = this.#normalizeUrl(url);
		this.#extractor = extractor;
	}

	async init(): Promise<any> {
		const data = await this.#getData();
		return {
			data,
			messsage: "DataSocial no implementado debido a lo cambiante que es su web"
		};
	}

	async #getData(): Promise<any> {
		const dataSocial = this.#url.map(url => new DS(url, this.#extractor));
		const promises = dataSocial.map(data => data.search());
		const data = await Promise.all(promises);
		return data;
	}

	#normalizeUrl(url: string[] | string): string[] {
		return typeof url === "string" ? [url] : url;
	}
}

export default DataSocial;
