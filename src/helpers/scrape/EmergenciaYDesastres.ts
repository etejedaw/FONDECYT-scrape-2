import { Getter, HtmlExtractor } from "../../libs/htmlExtractor";
import {
	Output,
	EmergenciaYDesastres as EyDData
} from "../../libs/dataExtractor";
import cheerio from "cheerio";
import { ArrayData, Data, ScrapeBase } from "./ScrapeBase";

export class EmergenciaYDesastres extends ScrapeBase<DataType> {
	constructor(url: string[] | string, extractor: HtmlExtractor) {
		super(url, extractor);
	}

	async init(): ArrayData<DataType> {
		return await this.innerInit();
	}

	async getData(): Promise<Output[]> {
		const emergenciaYDesastres = this.url.map(
			url => new EyDData(url, this.extractor)
		);
		const promises = emergenciaYDesastres.map(
			async data => await data.search()
		);
		const data = await Promise.all(promises);
		return data.flat().filter(Boolean);
	}

	async scrape(output: Output): Data<DataType> {
		const getter = await Getter.build(output.link, this.extractor);

		const html = getter.html;
		if (!html) return { metadata: output };

		const $ = cheerio.load(html);
		const data: DataType[] = $(".back-fechas .item .card")
			.map((idx, elem) => {
				const dateElem = $(elem).find(".caja-date");
				const date: DataType["date"] = {
					day: Number(
						$(dateElem).find(".dat_day").text().trim().split("\t")[0]
					),
					month: $(dateElem).find(".dat_mes").text().trim(),
					year: Number($(dateElem).find(".dat_year").text().trim())
				};
				const placeElem = $(elem).find(".card-body");
				const place: DataType["place"] = {
					type: $(placeElem).find(".card-title a").text().trim(),
					city: $(placeElem).find(".card-title.pb-3").text().trim()
				};
				return { date, place };
			})
			.get();

		return {
			scrape: data,
			metadata: output
		};
	}
}

interface DataType {
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
