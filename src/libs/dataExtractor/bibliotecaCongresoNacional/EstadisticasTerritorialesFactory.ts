import BibliotecaCongresoNacionalFactory from "./BibliotecaCongresoNacionalFactory";
import DataExtractor from "../DataExtractor";
import EstadisticasTerritoriales from "./EstadisticasTerritoriales";
import { HtmlExtractor } from "../../htmlExtractor";

class EstadisticasTerritorialesFactory extends BibliotecaCongresoNacionalFactory {
	createDataExtractor(url: string, extractor: HtmlExtractor): DataExtractor {
		return new EstadisticasTerritoriales(url, extractor);
	}
}

export default EstadisticasTerritorialesFactory;
