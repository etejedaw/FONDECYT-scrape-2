import App from "./app";
import { MongoDb } from "./database/";
import Config from "./config";
import ConfigEnum from "./config/config.enum";
import Winston from "./helpers/winston/winston";

async function main(): Promise<void> {
	const config = new Config();

	const app = new App(config.get(ConfigEnum.PORT));
	const db = new MongoDb({
		DB_PORT: config.get(ConfigEnum.DB_PORT),
		DB_HOST: config.get(ConfigEnum.DB_HOST),
		DB_USERNAME: config.get(ConfigEnum.DB_USERNAME),
		DB_PASSWORD: config.get(ConfigEnum.DB_PASSWORD)
	});

	const winston = new Winston(config.get(ConfigEnum.NODE_ENV));

	try {
		app.listen();
		winston.info(`Server connected on port ${config.get(ConfigEnum.PORT)}`);
		await db.connect();
		winston.info(
			`Database connected on port ${config.get(ConfigEnum.DB_PORT)}`
		);
	} catch (error) {
		console.log(error);
	}
}

void main();
