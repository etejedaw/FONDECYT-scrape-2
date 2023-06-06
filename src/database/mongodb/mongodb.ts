import mongoose, { Error } from "mongoose";
import DatabaseInterface from "../database.interface";
import MongoDbInterface from "./mongodb.interface";
import ConnectionError from "./connection.error";

class MongoDb implements DatabaseInterface {
	readonly #DB_USERNAME: string;
	readonly #DB_PASSWORD: string;
	readonly #DB_HOST: string;
	readonly #DB_PORT: string;

	constructor(environment: MongoDbInterface) {
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
		try {
			const uri = this.getConnectionString();
			await mongoose.connect(uri);
		} catch (error) {
			if (error instanceof Error.MongooseServerSelectionError)
				throw new ConnectionError(error.message);
			throw error;
		}
	}

	async disconnect(): Promise<void> {
		await mongoose.disconnect();
	}
}

export default MongoDb;
