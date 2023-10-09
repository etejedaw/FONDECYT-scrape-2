import { Getter, HtmlExtractor } from "../../htmlExtractor";
import DataExtractor from "../DataExtractor";
import ReporteComunalScraper from "./ReporteComunalScraper";
import Output from "../Output";

class ReporteComunal extends DataExtractor {
	readonly #url: string;

	constructor(url: string, extractor: HtmlExtractor) {
		super("https://www.bcn.cl/siit/reportescomunales", extractor);
		this.isCorrectUrl(url);
		this.#url = url;
	}

	async search(): Promise<Output[]> {
		const getter = await Getter.build(this.#url, this.extractor);
		const html = getter.html;
		if (!html) return this.emptyHTML(this.#url);
		const scraper = new ReporteComunalScraper(html, this.#url);
		return scraper.getData();
		// return {
		// 	data,
		// 	message:
		// 		"Debido a lo variante que puede ser cada url generada, se optó por no implementar esta extracción"
		// };
		// return await this.innerSearch(this.#url)
	}

	async scraper(): Promise<ReporteComunalScraper | undefined> {
		const getter = await Getter.build(this.#url, this.extractor);
		const html = getter.html;
		if (!html) return;
		return new ReporteComunalScraper(html, this.#url);
	}
}

export default ReporteComunal;
