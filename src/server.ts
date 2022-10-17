import App from "./app";
import Database from "./database";

async function main(): Promise<void> {
	try {
		const db = new Database();
		const app = new App();
		await db.connect();
		app.listen();
	} catch (error) {
		console.log(error);
	}
}

void main();
