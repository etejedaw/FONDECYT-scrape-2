interface HtmlExtractor {
	get: (url: string) => Promise<string>;
}

export default HtmlExtractor;
