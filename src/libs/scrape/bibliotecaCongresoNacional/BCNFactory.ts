import BCNTypes from "./BCNTypes";
import EstadisticasTerritoriales from "./EstadisticasTerritoriales";
import ReporteComunal from "./ReporteComunal";

function BCNFactory(type: BCNTypes): returnTypeBCN {
	switch (type) {
		case BCNTypes.ESTADISTICA_TERRITORIAL:
			return EstadisticasTerritoriales;
		case BCNTypes.REPORTE_COMUNAL:
			return ReporteComunal;
		default:
			throw new Error("Bad option. Please use BCNType");
	}
}

type returnTypeBCN = typeof EstadisticasTerritoriales | typeof ReporteComunal;

export default BCNFactory;
