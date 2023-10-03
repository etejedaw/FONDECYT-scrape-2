import { HtmlExtractor } from "../htmlExtractor";
import Scraper from "./Scraper";

abstract class DataExtractor {
	readonly #baseUrl: string;
	readonly #extractor: HtmlExtractor;

	protected constructor(baseUrl: string, extractor: HtmlExtractor) {
		this.#baseUrl = baseUrl;
		this.#extractor = extractor;
	}

	abstract search(): Promise<Output[] | undefined>;
	abstract scraper(): Promise<Scraper | undefined>;

	isCorrectUrl(url: string): void {
		const baseUrl = new URL(this.baseUrl);
		const inputUrl = new URL(url);
		if (baseUrl.origin !== inputUrl.origin)
			throw new Error(`Input url does not match with ${this.#baseUrl} url`);
	}

	get baseUrl(): string {
		return this.#baseUrl;
	}

	get extractor(): HtmlExtractor {
		return this.#extractor;
	}
}

export default DataExtractor;

export interface Output {
	title: string;
	code?: string;
	link: string;
	format: Format;
}

type Format = "xlsx" | "json" | "html";
