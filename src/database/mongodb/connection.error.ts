class ConnectionError extends Error {
	readonly #detail: string;
	constructor(message: string) {
		super(message);
		this.name = "Connection Error";
		this.#detail = "Can't connect to the database";
	}

	get detail(): string {
		return this.#detail;
	}
}

export default ConnectionError;
