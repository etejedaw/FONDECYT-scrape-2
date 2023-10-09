import DataExtractor from "../DataExtractor";
import { HtmlExtractor } from "../../htmlExtractor";

abstract class BibliotecaCongresoNacionalFactory {
	abstract createDataExtractor(
		url: string,
		extractor: HtmlExtractor
	): DataExtractor;
}

export default BibliotecaCongresoNacionalFactory;
