import BCNTypes from "./BCNTypes";
import EstadisticasTerritoriales from "./EstadisticasTerritoriales";
import ReporteComunal from "./ReporteComunal";

function BCNFactory(type: BCNTypes): Function {
	switch (type) {
		case BCNTypes.ESTADISTICA_TERRITORIAL:
			return EstadisticasTerritoriales;
		case BCNTypes.REPORTE_COMUNAL:
			return ReporteComunal;
		default:
			throw new Error("Bad option. Please use BCNType");
	}
}

export default BCNFactory;
