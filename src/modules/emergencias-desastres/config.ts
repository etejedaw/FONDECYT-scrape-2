import {
	IndicatorBuilder,
	ModuleConfig
} from "../../core/utils/indicator-builder";

export const EMERGENCIA_DESASTRES_CONFIG: ModuleConfig = {
	"simulacros-2022": new IndicatorBuilder()
		.setName("Simulacros 2022")
		.setUrl("https://emergenciaydesastres.mineduc.cl/simulacros-2022/")
		.setFrequency("once")
		.setAdapter("html")
		.build(),
	"simulacro-2023": new IndicatorBuilder()
		.setName("Simulacros 2023")
		.setUrl("https://emergenciaydesastres.mineduc.cl/simulacros-2023/")
		.setFrequency("once")
		.setAdapter("html")
		.build()
} as const;
