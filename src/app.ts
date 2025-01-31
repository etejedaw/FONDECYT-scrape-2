import { environment } from "./config/environment";
import { mongodb } from "./config/database";
import { server } from "./server";

async function main(): Promise<void> {
	server(environment.PORT);
	console.log(`Server connected on port ${environment.PORT}`);

	await mongodb();
	console.log(`Database connected on port ${environment.DB_PORT}`);
}

void main();
