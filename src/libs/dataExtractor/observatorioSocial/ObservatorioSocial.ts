import { Getter, HtmlExtractor } from "../../htmlExtractor";
import ObservatorioSocialScraper from "./ObservatorioSocialScraper";
import Output from "../Output";
import DataExtractor from "../DataExtractor";

class ObservatorioSocial extends DataExtractor {
	readonly #url: string;

	constructor(url: string, extractor: HtmlExtractor) {
		super("https://observatorio.ministeriodesarrollosocial.gob.cl/", extractor);
		this.isCorrectUrl(url);
		this.#url = url;
	}

	async search(): Promise<Output[]> {
		const scrape = await this.scraper();
		if (!scrape) return this.emptyHTML(this.#url);
		const output = scrape.getData();
		if (output.length === 0) return this.emptyOutput(this.#url);
		return output;
	}

	async scraper(): Promise<ObservatorioSocialScraper | undefined> {
		const getter = await Getter.build(this.#url, this.extractor);
		const html = getter.html;
		if (!html) return;
		return new ObservatorioSocialScraper(html, this.baseUrl);
	}

	async getByCode(code: string): Promise<Output | undefined> {
		const allData = await this.search();
		if (!allData) return;
		const data = allData.find(data => data.code === code.trim());
		if (!data) return;
		return data;
	}
}

export default ObservatorioSocial;
