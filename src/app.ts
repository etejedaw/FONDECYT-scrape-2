import express, { Express } from "express";
import Index from "./config";
import configEnum from "./config/config.enum";

class App {
	private readonly app: Express;
	private readonly config: Index;

	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.config = new Index();
	}

	getApp(): Express {
		return this.app;
	}

	listen(): void {
		const PORT = this.config.get(configEnum.PORT);
		this.app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
	}
}
export default App;
