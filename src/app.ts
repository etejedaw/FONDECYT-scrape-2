import Server from "./api/Server";
import { MongoDb } from "./database/";
import Config from "./config/config";
import Winston from "./helpers/logger/winston";
import { ConnectionError } from "./database";

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
	} catch (error) {
		if (error instanceof ConnectionError)
			winston.error(error.name, error.detail);
		else console.log(error);
	}
}

void main();
