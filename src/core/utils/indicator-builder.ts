import { z } from "zod";
import { ParseAdapter } from "../adapters/parse-adapter/ParseAdapter";
import { FetchAdapter } from "../adapters/fetch-adapter/FetchAdapter";

export class IndicatorBuilder {
	#config: Indicator;

	constructor() {
		this.#config = {} as Indicator;
	}

	setName(name: string) {
		this.#config.name = name;
		return this;
	}

	setDescription(description: string) {
		this.#config.description = description;
		return this;
	}

	setUrl(url: string) {
		this.#config.url = url;
		return this;
	}

	setFetchAdapter(adapter: FetchAdapter) {
		this.#config.fetchAdapter = adapter;
		return this;
	}

	setParseAdapter(adapter: ParseAdapter) {
		this.#config.parseAdapter = adapter;
		return this;
	}

	setFrequency(frequency: Indicator["frequency"]) {
		this.#config.frequency = frequency;
		return this;
	}

	build(): Indicator {
		return {
			...IndicatorSchema.parse(this.#config),
			fetchAdapter: this.#config.fetchAdapter,
			parseAdapter: this.#config.parseAdapter
		};
	}
}

const IndicatorSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	url: z.string().url(),
	frequency: z.enum(["daily", "weekly", "monthly", "year", "once"])
});

export type Indicator = z.infer<typeof IndicatorSchema> & {
	fetchAdapter: FetchAdapter;
	parseAdapter: ParseAdapter;
};
export type ModuleConfig = Record<string, Indicator>;
