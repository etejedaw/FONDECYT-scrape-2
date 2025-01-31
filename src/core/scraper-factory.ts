import { ScrapeBase } from "./scrape-base";
import { ModuleConfig } from "./utils/indicator-builder";

// TODO: Ver otra forma para que no sea una clase solo con métodos estáticos
// Singleton posible solución?
export class ScraperFactory {
	static #modules = {} as Record<string, ModuleConfig>;

	static register(scraper: ScrapeBase) {
		this.#modules[scraper.name] = scraper.config;
	}

	static getIndicators(module: string) {
		return Object.keys(this.#modules[module]);
	}
}
