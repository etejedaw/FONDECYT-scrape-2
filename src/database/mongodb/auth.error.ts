class AuthError extends Error {
	readonly #detail: string;
	constructor(message: string) {
		super(message);
		this.name = "Authentication Failed";
		this.#detail = "Can't connect to the database";
	}

	get detail(): string {
		return this.#detail;
	}
}

export default AuthError;
