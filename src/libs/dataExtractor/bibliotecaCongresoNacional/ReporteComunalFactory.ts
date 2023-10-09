import BibliotecaCongresoNacionalFactory from "./BibliotecaCongresoNacionalFactory";
import { HtmlExtractor } from "../../htmlExtractor";
import DataExtractor from "../DataExtractor";
import ReporteComunal from "./ReporteComunal";

class ReporteComunalFactory extends BibliotecaCongresoNacionalFactory {
	createDataExtractor(url: string, extractor: HtmlExtractor): DataExtractor {
		return new ReporteComunal(url, extractor);
	}
}

export default ReporteComunalFactory;
