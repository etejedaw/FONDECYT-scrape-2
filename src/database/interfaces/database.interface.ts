interface Database {
	getConnectionString: () => string;
	connect: () => Promise<void>;
	disconnect: () => Promise<void>;
}

export default Database;
