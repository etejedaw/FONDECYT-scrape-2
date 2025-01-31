import { z } from "zod";

export class IndicatorBuilder {
	#config: Indicator;

	constructor() {
		this.#config = {} as Indicator;
	}

	setName(name: string) {
		this.#config.name = name;
		return this;
	}

	setUrl(url: string) {
		this.#config.url = url;
		return this;
	}

	// TODO: Cómo hacer para que al seleccionar como adapter html
	// se pueda seleccionar la forma en la que se desea hacer
	// el scraping
	setAdapter(adapter: Indicator["adapter"]) {
		this.#config.adapter = adapter;
		return this;
	}

	setFrequency(frequency: Indicator["frequency"]) {
		this.#config.frequency = frequency;
		return this;
	}

	setDescription(description: string) {
		this.#config.description = description;
		return this;
	}

	build(): Indicator {
		return IndicatorSchema.parse(this.#config);
	}
}

const IndicatorSchema = z.object({
	name: z.string(),
	url: z.string().url(),
	description: z.string().optional(),
	adapter: z.enum(["html", "json"]),
	frequency: z.enum(["daily", "weekly", "monthly", "year", "once"])
});

export type Indicator = z.infer<typeof IndicatorSchema>;
export type ModuleConfig = Record<string, Indicator>;
