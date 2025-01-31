export abstract class ParseAdapter<T = unknown> {
	abstract extract: (data: string) => T;
}
