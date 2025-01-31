import { ScrapeBase } from "./ScrapeBase";

export class ScraperFactory {
	#modules: Record<string, ScrapeBase>;
	static #instance: ScraperFactory;

	constructor() {
		this.#modules = {};
	}

	static getInstance(): ScraperFactory {
		if (!this.#instance) this.#instance = new ScraperFactory();
		return this.#instance;
	}

	register(scraper: ScrapeBase) {
		const scraperName = scraper.getName();
		this.#modules[scraperName] = scraper;
	}

	getIndicators(module: string) {
		return this.#modules[module].getIndicators();
	}

	get(module: string) {
		return this.#modules[module];
	}
}
