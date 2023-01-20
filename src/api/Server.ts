import express, { Express } from "express";

class Server {
	readonly #app: Express;

	constructor() {
		this.#app = express();
		this.#app.use(express.json());
	}

	get app(): Express {
		return this.#app;
	}

	listen(port: number): void {
		this.#app.listen(port);
	}
}
export default Server;
