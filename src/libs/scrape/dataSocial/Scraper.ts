import cheerio from "cheerio";
import Output from "../output.interface";

class Scraper {
	readonly #html: string;

	constructor(html: string) {
		this.#html = html;
	}

	getData(): Output[] {
		const $ = cheerio.load(this.#html);
		return $("nav .nav .text-white a")
			.map((idx, elem) => {
				const title = $(elem).attr("title") || "";
				const link = $(elem).attr("href") || "";
				const output: Output = {
					title,
					link,
					format: "xlsx"
				};
				return output;
			})
			.get()
			.filter(output => this.#existOutput(output));
	}

	#existOutput(output: Partial<Output>): boolean {
		return Boolean(output.title) && Boolean(output.format);
	}
}

export default Scraper;
