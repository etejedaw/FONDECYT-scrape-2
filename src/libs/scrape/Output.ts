interface Output {
	title: string;
	link: string;
	format: Format;
}

type Format = "xlsx" | "json" | "html";

export default Output;
