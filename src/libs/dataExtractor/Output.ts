interface Output {
	title: string;
	code?: string;
	link: string;
	format: Format;
}

type Format = "xlsx" | "json" | "html";

export default Output;
