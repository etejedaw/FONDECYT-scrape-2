import { HtmlExtractor } from "../htmlExtractor";
import Scraper from "./Scraper";
import Output from "./Output";

abstract class DataExtractor {
	readonly #baseUrl: string;
	readonly #extractor: HtmlExtractor;

	protected constructor(baseUrl: string, extractor: HtmlExtractor) {
		this.#baseUrl = baseUrl;
		this.#extractor = extractor;
	}

	abstract search(): Promise<Output[]>;
	abstract scraper(): Promise<Scraper | undefined>;

	isCorrectUrl(url: string): void {
		const baseUrl = new URL(this.baseUrl);
		const inputUrl = new URL(url);
		if (baseUrl.origin !== inputUrl.origin)
			throw new Error(`Input url does not match with ${this.#baseUrl} url`);
	}

	emptyHTML(url: string): Output[] {
		return [
			{
				title: "Scraper cant extract HTML. Please update Scraper Method",
				link: url,
				format: "error"
			}
		];
	}

	emptyOutput(url: string): Output[] {
		return [
			{
				title:
					"Scraper cant extract data from HTML. Please update getData function ",
				link: url,
				format: "error"
			}
		];
	}

	get baseUrl(): string {
		return this.#baseUrl;
	}

	get extractor(): HtmlExtractor {
		return this.#extractor;
	}
}

export default DataExtractor;
