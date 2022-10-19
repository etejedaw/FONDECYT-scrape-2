interface DatabaseInterface {
	getConnectionString: () => string;
	connect: () => Promise<void>;
	disconnect: () => Promise<void>;
}

export default DatabaseInterface;
