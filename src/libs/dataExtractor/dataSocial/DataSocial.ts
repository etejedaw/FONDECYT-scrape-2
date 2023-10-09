import { Getter, HtmlExtractor } from "../../htmlExtractor";
import DataSocialScraper from "./DataSocialScraper";
import Output from "../Output";
import DataExtractor from "../DataExtractor";

class DataSocial extends DataExtractor {
	readonly #url: string;

	constructor(url: string, extractor: HtmlExtractor) {
		super("https://datasocial.ministeriodesarrollosocial.gob.cl", extractor);
		this.isCorrectUrl(url);
		this.#url = url;
	}

	async search(): Promise<Output[]> {
		return await this.innerSearch(this.#url);
	}

	async scraper(): Promise<DataSocialScraper | undefined> {
		const getter = await Getter.build(this.#url, this.extractor);
		const html = getter.html;
		if (!html) return;
		return new DataSocialScraper(html, this.#url);
	}

	async getByTitle(title: string): Promise<Output | undefined> {
		const allData = await this.search();
		if (!allData) return;
		const data = allData.find(data => data.title === title.trim());
		if (!data) return;
		return data;
	}
}

export default DataSocial;
