import express from "express";
import morgan from "morgan";
import { environment } from "./config/environment";

export function server(port: number): void {
	const nodeEnv = environment.NODE_ENV;

	const app = express();

	app.use(morgan(nodeEnv));
	app.use(express.json());

	app.listen(port);
}
