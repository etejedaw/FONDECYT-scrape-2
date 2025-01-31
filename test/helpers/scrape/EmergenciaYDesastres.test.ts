import { EmergenciaYDesastres } from "../../../src/helpers/scrape";
import RequestPromise from "../../../src/libs/htmlExtractor/requestPromise/RequestPromise";

describe("Any scrape in EmergenciaYDesastres must have", () => {
	const requestPromise = new RequestPromise();
	const url = "https://emergenciaydesastres.mineduc.cl/simulacros-2022/";

	const emergenciaydesastres = new EmergenciaYDesastres(url, requestPromise);

	it("At least one object in the array", async () => {
		const data = await emergenciaydesastres.init();

		expect(data.length).toBeGreaterThan(0);
	});

	it("At least one scrape data must exist", async () => {
		const data = await emergenciaydesastres.init();
		const firstDataElement = data[0];
		const scrapeFirstDataElement = firstDataElement.scrape;
		expect(Array.isArray(scrapeFirstDataElement)).toBe(true);
	});

	it("Data without error format", async () => {
		const data = await emergenciaydesastres.init();
		const scrapeErrors = data.filter(
			scrapeData => scrapeData.metadata.format === "error"
		);
		expect(scrapeErrors.length).toBe(0);
	});

	it("All the scrape variables with their own data structure ", async () => {
		const data = await emergenciaydesastres.init();

		data.forEach(urlScrape => {
			const scrape = urlScrape.scrape;

			scrape?.forEach(scrapeData => {
				expect(scrapeData).toHaveProperty("date");
				expect(scrapeData).toHaveProperty("place");
			});
		});
	});
});
