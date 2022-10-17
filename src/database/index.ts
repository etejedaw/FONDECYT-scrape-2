import Index from "../config";
import ConfigEnum from "../config/config.enum";
import mongoose from "mongoose";

class Database {
	private readonly DB_USERNAME: string;
	private readonly DB_PASSWORD: string;
	private readonly DB_HOST: string;
	private readonly DB_PORT: string;

	constructor() {
		const config = new Index();
		this.DB_USERNAME = config.get(ConfigEnum.DB_USERNAME);
		this.DB_PASSWORD = config.get(ConfigEnum.DB_PASSWORD);
		this.DB_HOST = config.get(ConfigEnum.DB_HOST);
		this.DB_PORT = config.get(ConfigEnum.DB_PORT);
	}

	#getConnectionString(): string {
		return `mongodb://${this.DB_USERNAME}:${this.DB_PASSWORD}@${this.DB_HOST}:${this.DB_PORT}`;
	}

	async connect(): Promise<void> {
		const uri = this.#getConnectionString();
		await mongoose.connect(uri);
		console.log(`Database connected on port ${this.DB_PORT}`);
	}

	async disconnect(): Promise<void> {
		await mongoose.disconnect();
	}
}

export default Database;
