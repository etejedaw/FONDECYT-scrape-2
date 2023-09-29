import { Output } from "../../libs/dataExtractor";

interface ScrapeData<dataType> {
	data: dataType[];
	output: Output;
}

export default ScrapeData;
