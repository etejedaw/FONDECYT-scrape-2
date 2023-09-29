import { Getter, HtmlExtractor } from "../../libs/htmlExtractor";
import {
	Output,
	EmergenciaYDesastres as EyDData
} from "../../libs/dataExtractor";
import cheerio from "cheerio";
import ScrapeData from "./ScrapeData";

class EmergenciaYDesastres {
	readonly #url: string[];
	readonly #extractor: HtmlExtractor;

	constructor(url: string[] | string, extractor: HtmlExtractor) {
		this.#url = this.#normalizeUrl(url);
		this.#extractor = extractor;
	}

	async init(): Promise<EmergenciaYDesastresData[]> {
		const data = await this.#getData();
		const cleanData = data.filter(Boolean);
		if (cleanData.length === 0) return [];
		const promises = cleanData.map(data => this.#scrape(data));
		const extractData = await Promise.all(promises);
		if (extractData.filter(Boolean).length === 0) return [];
		return extractData.filter(Boolean);
	}

	async #getData(): Promise<Array<Output | undefined>> {
		const emergenciaYDesastres = this.#url.map(
			url => new EyDData(url, this.#extractor)
		);
		const promises = emergenciaYDesastres.map(data => data.search());
		const data = await Promise.all(promises);
		return data.flat();
	}

	async #scrape(output: Output): Promise<EmergenciaYDesastresData | undefined> {
		const getter = await Getter.build(output.link, this.#extractor);
		const html = getter.html;
		if (!html) return;
		const $ = cheerio.load(html);
		const data: dataType[] = $(".back-fechas .item .card")
			.map((idx, elem) => {
				const dateElem = $(elem).find(".caja-date");
				const date: dataType["date"] = {
					day: Number(
						$(dateElem).find(".dat_day").text().trim().split("\t")[0]
					),
					month: $(dateElem).find(".dat_mes").text().trim(),
					year: Number($(dateElem).find(".dat_year").text().trim())
				};
				const placeElem = $(elem).find(".card-body");
				const place: dataType["place"] = {
					type: $(placeElem).find(".card-title a").text().trim(),
					city: $(placeElem).find(".card-title.pb-3").text().trim()
				};
				return { date, place };
			})
			.get();
		return { data, output };
	}

	#normalizeUrl(url: string[] | string): string[] {
		return typeof url === "string" ? [url] : url;
	}
}

interface dataType {
	date: {
		day: number;
		month: string;
		year: number;
	};
	place: {
		type: string;
		city: string;
	};
}
interface EmergenciaYDesastresData extends ScrapeData<dataType> {
	data: dataType[];
	output: Output;
}

export default EmergenciaYDesastres;
