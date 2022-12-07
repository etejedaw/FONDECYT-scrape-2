import Server from "./Server";
import { MongoDb } from "./database/";
import Config from "./config/config";
import ConfigEnum from "./config/config.enum";
import Winston from "./helpers/logger/winston/winston";

async function main(): Promise<void> {
	const config = new Config();
	const winston = new Winston(config.get(ConfigEnum.NODE_ENV));

	try {
		const server = new Server();
		const serverPort = Number(config.get(ConfigEnum.PORT));
		server.listen(serverPort);
		winston.info(`Server connected on port ${serverPort}`);

		const mongoDb = new MongoDb({
			DB_PORT: config.get(ConfigEnum.DB_PORT),
			DB_HOST: config.get(ConfigEnum.DB_HOST),
			DB_USERNAME: config.get(ConfigEnum.DB_USERNAME),
			DB_PASSWORD: config.get(ConfigEnum.DB_PASSWORD)
		});
		await mongoDb.connect();
		winston.info(
			`Database connected on port ${config.get(ConfigEnum.DB_PORT)}`
		);
	} catch (error) {
		console.log(error);
	}
}

void main();
