import { environment } from "./config/environment";
import { mongodb } from "./config/database";
import { server } from "./api/server";
import { ScraperFactory } from "./core/scraper-factory";
import { EmergenciaDesastresScraper } from "./modules/emergencias-desastres/emergencia-desastres-scraper";

async function main(): Promise<void> {
	ScraperFactory.register(new EmergenciaDesastresScraper());

	server(environment.PORT);
	console.log(`Server connected on port ${environment.PORT}`);

	await mongodb();
	console.log(`Database connected on port ${environment.DB_PORT}`);
}

void main();
