import mongoose from "mongoose";
import Database from "./interfaces/database.interface";
import MongodbInterface from "./interfaces/mongodb.interface";

class MongoDb implements Database {
	readonly #DB_USERNAME: string;
	readonly #DB_PASSWORD: string;
	readonly #DB_HOST: string;
	readonly #DB_PORT: string;

	constructor(environment: MongodbInterface) {
		this.#DB_USERNAME = environment.DB_USERNAME;
		this.#DB_PASSWORD = environment.DB_PASSWORD;
		this.#DB_HOST = environment.DB_HOST;
		this.#DB_PORT = environment.DB_PORT;
	}

	getConnectionString(): string {
		return `mongodb://${this.#DB_USERNAME}:${this.#DB_PASSWORD}@${
			this.#DB_HOST
		}:${this.#DB_PORT}`;
	}

	async connect(): Promise<void> {
		const uri = this.getConnectionString();
		await mongoose.connect(uri);
	}

	async disconnect(): Promise<void> {
		await mongoose.disconnect();
	}
}

export default MongoDb;
