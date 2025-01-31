import { ModuleConfig } from "./utils/indicator-builder";

export abstract class ScrapeBase {
	readonly #moduleConfig: ModuleConfig;
	readonly #moduleName: string;

	constructor(moduleName: string, moduleConfig: ModuleConfig) {
		this.#moduleName = moduleName;
		this.#moduleConfig = moduleConfig;
	}

	getIndicators() {
		return Object.keys(this.#moduleConfig);
	}

	getName() {
		return this.#moduleName;
	}

	getIndicatorDescription(indicator: string) {
		return this.#moduleConfig[indicator].description;
	}

	getIndicatorUrl(indicator: string) {
		return this.#moduleConfig[indicator].url;
	}

	#getFetchAdapter(indicator: string) {
		return this.#moduleConfig[indicator].fetchAdapter;
	}

	#getParseAdapter(indicator: string) {
		return this.#moduleConfig[indicator].parseAdapter;
	}

	async init(indicator: string) {
		const url = this.getIndicatorUrl(indicator);
		const fetchAdapter = this.#getFetchAdapter(indicator);
		const fetch = await fetchAdapter.fetch(url);

		const parseAdapter = this.#getParseAdapter(indicator);
		return parseAdapter.extract(fetch);
	}
}
