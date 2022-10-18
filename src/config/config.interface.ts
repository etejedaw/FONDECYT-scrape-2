import ConfigEnum from "./config.enum";

interface ConfigInterface {
	get: (key: ConfigEnum) => string;
}

export default ConfigInterface;
