import { Getter, HtmlExtractor } from "../../htmlExtractor";
import Scraper from "./Scraper";
import Output from "../output.interface";

class DataSocial {
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
		const scraper = new Scraper(html);
		return scraper.getData();
	}

	async getByTitle(title: string): Promise<Output | undefined> {
		const allData = await this.search();
		if (!allData) return;
		const data = allData.find(data => data.title === title.trim());
		if (!data) return;
		return data;
	}

	#checkUrl(url: string): string {
		const BASE_URL = "https://datasocial.ministeriodesarrollosocial.gob.cl/";
		const baseUrl = new URL(BASE_URL);
		const inputUrl = new URL(url);
		if (baseUrl.origin !== inputUrl.origin)
			throw new Error("Input url does not match DataSocial url");
		return url;
	}
}

export default DataSocial;
