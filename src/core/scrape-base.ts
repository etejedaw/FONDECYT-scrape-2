import { ModuleConfig } from "./utils/indicator-builder";

// TODO: Ver cómo se integra la clase abstracta en conjunto
// con los adaptadores. Ya que cada indicador tiene su propia
// forma de extraer la data (html, json, etc). Además, cada html
// puede tener su propia forma de hacer srapping
export abstract class ScrapeBase {
	readonly config: ModuleConfig;
	readonly name: string;

	constructor(moduleName: string, config: ModuleConfig) {
		this.name = moduleName;
		this.config = config;
	}

	abstract fetchHtml(url: string): Promise<string>;
	abstract extractData(html: string): Promise<unknown>;
}
