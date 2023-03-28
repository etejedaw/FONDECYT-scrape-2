import request from "request-promise";
import HtmlExtractor from "../htmlExtractor.intereface";

class RequestPromise implements HtmlExtractor {
	async get(url: string): Promise<string> {
		return await request.get(url);
	}
}

export default RequestPromise;
