import Output from "./Output";

abstract class Scraper {
	readonly #htmlCode: string;
	readonly #baseUrl: string;

	protected constructor(htmlCode: string, baseUrl: string) {
		this.#htmlCode = htmlCode;
		this.#baseUrl = baseUrl;
	}

	abstract getData(): Output[];

	get htmlCode(): string {
		return this.#htmlCode;
	}

	get baseUrl(): string {
		return this.#baseUrl;
	}
}

export default Scraper;
