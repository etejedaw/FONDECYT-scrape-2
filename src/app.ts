import express, { Express } from "express";

class App {
	readonly #app: Express;
	readonly #PORT: string;

	constructor(port: string) {
		this.#PORT = port;
		this.#app = express();
		this.#app.use(express.json());
	}

	getApp(): Express {
		return this.#app;
	}

	listen(): void {
		this.#app.listen(this.#PORT);
	}
}
export default App;
