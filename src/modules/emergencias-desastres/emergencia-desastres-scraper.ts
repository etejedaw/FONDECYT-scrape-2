import { ScrapeBase } from "../../core/scrape-base";
import { EMERGENCIA_DESASTRES_CONFIG } from "./config";

export class EmergenciaDesastresScraper extends ScrapeBase {
	constructor() {
		super("emergencia-desastres", EMERGENCIA_DESASTRES_CONFIG);
	}

	async fetchHtml(url: string): Promise<string> {
		throw new Error("Method not implemented.");
	}

	async extractData(html: string): Promise<unknown> {
		throw new Error("Method not implemented.");
	}
}
