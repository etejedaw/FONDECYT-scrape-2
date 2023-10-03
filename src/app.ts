import Server from "./api/Server";
import { MongoDb } from "./database/";
import Config from "./config/config";
import Winston from "./helpers/logger/winston";
import { AuthError, ConnectionError } from "./database";
import { RequestPromise } from "./libs/htmlExtractor";
import { ObservatorioSocial } from "./helpers/scrape";

async function main(): Promise<void> {
	const config = new Config();
	const winston = new Winston(config.get("NODE_ENV"));

	try {
		const server = new Server();
		const serverPort = Number(config.get("PORT"));
		server.listen(serverPort);
		winston.info(`Server connected on port ${serverPort}`);

		const mongoDb = new MongoDb({
			DB_PORT: config.get("DB_PORT"),
			DB_HOST: config.get("DB_HOST"),
			DB_USERNAME: config.get("DB_USERNAME"),
			DB_PASSWORD: config.get("DB_PASSWORD")
		});
		await mongoDb.connect();
		winston.info(`Database connected on port ${config.get("DB_PORT")}`);

		// TEST

		const url =
			"https://observatorio.ministeriodesarrollosocial.gob.cl/encuesta-casen-2017";
		const extractor = new RequestPromise();

		const observatorioSocial = new ObservatorioSocial(url, extractor);
		const data = await observatorioSocial.getAll();
		//const data = await observatorioSocial.init("prevision-social-casen-2017");
		console.log(data);

		//
	} catch (error) {
		if (error instanceof ConnectionError)
			winston.error(error.name, error.detail);
		if (error instanceof AuthError) winston.error(error.name, error.detail);
		else console.log(error);
	}
}

void main();
