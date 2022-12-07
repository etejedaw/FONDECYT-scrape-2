import ConfigInterface from "./config.interface";
import * as dotenv from "dotenv";
import ConfigEnum from "./config.enum";
import { env } from "./config.dev";
dotenv.config();

class Config implements ConfigInterface {
	readonly #envConfig: { [key: string]: string };

	constructor() {
		this.#envConfig = {
			PORT: process.env.PORT ?? env.PORT,
			DB_HOST: process.env.DB_HOST ?? env.DB_HOST,
			DB_PORT: process.env.DB_PORT ?? env.DB_PORT,
			DB_USERNAME: process.env.DB_USERNAME ?? env.DB_USERNAME,
			DB_PASSWORD: process.env.DB_PASSWORD ?? env.DB_PASSWORD,
			NODE_ENV: process.env.NODE_ENV ?? env.NODE_ENV
		};
	}

	get(key: ConfigEnum): string {
		return this.#envConfig[key];
	}
}

export default Config;
