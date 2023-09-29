import { Getter, HtmlExtractor } from "../../libs/htmlExtractor";
import BCNTypes from "../../libs/dataExtractor/bibliotecaCongresoNacional/BCNTypes";
import { BCNFactory } from "../../libs/dataExtractor/bibliotecaCongresoNacional";

class BibliotecaCongresoNacional {
	readonly #url: string;
	readonly #extractor: HtmlExtractor;
	readonly #bcnType: BCNTypes;

	constructor(url: string, extractor: HtmlExtractor, bcnType: BCNTypes) {
		this.#url = url;
		this.#extractor = extractor;
		this.#bcnType = bcnType;
	}

	async init(): Promise<any> {
		const dataUrl = await this.#getData();
		if (this.#bcnType === BCNTypes.REPORTE_COMUNAL) return dataUrl;
		const promises = dataUrl.map(data => this.#scrape(data.link));
		const data = await Promise.all(promises);
		return data.map(info => info.datosTemaN);
	}

	async #getData(): Promise<any[]> {
		const Bcn = BCNFactory(this.#bcnType);
		const bibliotecaCongresoNacional = new Bcn(this.#url, this.#extractor);
		return await bibliotecaCongresoNacional.search();
	}

	async #scrape(url: string): Promise<any> {
		const getter = await Getter.build(url, this.#extractor);
		if (!getter.html) return;
		return JSON.parse(getter.html);
	}
}

export default BibliotecaCongresoNacional;
