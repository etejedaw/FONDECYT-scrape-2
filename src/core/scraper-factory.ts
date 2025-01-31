import { ScrapeBase } from "./scrape-base";

export class ScraperFactory {
	static #modules = {} as Record<string, ScrapeBase>;

	static register(scraper: ScrapeBase) {
		const scraperName = scraper.getName();
		this.#modules[scraperName] = scraper;
	}

	static getIndicators(module: string) {
		return this.#modules[module].getIndicators();
	}

	static get(module: string) {
		return this.#modules[module];
	}
}
