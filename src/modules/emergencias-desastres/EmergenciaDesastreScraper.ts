import { ScrapeBase } from "../../core/ScrapeBase";
import { EMERGENCIA_DESASTRES_CONFIG } from "./Config";

export class EmergenciaDesastresScraper extends ScrapeBase {
	constructor() {
		super("emergencia-desastres", EMERGENCIA_DESASTRES_CONFIG);
	}
}
