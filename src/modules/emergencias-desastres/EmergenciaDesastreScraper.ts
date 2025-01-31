import { ScrapeBase } from "../../core/scrape-base";
import { EMERGENCIA_DESASTRES_CONFIG } from "./config";

export class EmergenciaDesastresScraper extends ScrapeBase {
	constructor() {
		super("emergencia-desastres", EMERGENCIA_DESASTRES_CONFIG);
	}
}
