import { Getter, HtmlExtractor } from "../../libs/htmlExtractor";
import {
	Output,
	EmergenciaYDesastres as EyDData
} from "../../libs/dataExtractor";
import cheerio from "cheerio";
import { ReturnData, ScrapeBase } from "./ScrapeBase";

class EmergenciaYDesastres extends ScrapeBase<dataType> {
	constructor(url: string[] | string, extractor: HtmlExtractor) {
		super(url, extractor);
	}

	async init(): Promise<Array<ReturnData<dataType>>> {
		const data = await this.getData();
		if (data.length === 0) this.errorEmptyUrl();
		const promises = data.map(async data => await this.scrape(data));
		const extractData = await Promise.all(promises);
		const dataFiltered = extractData.filter(Boolean);
		if (dataFiltered.length === 0) this.errorEmptyExtract();
		return dataFiltered;
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

	async scrape(output: Output): Promise<ReturnData<dataType>> {
		const getter = await Getter.build(output.link, this.extractor);

		const html = getter.html;
		if (!html) return { metadata: output };

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

		return {
			scrape: data,
			metadata: output
		};
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

export default EmergenciaYDesastres;
