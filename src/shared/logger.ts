export default class Logger {

	private static getFormattedOuput(input: unknown): string {
		return `[${new Date().toUTCString()}] ${input}`;
	}

	static addLog(log: unknown) {
		console.log(this.getFormattedOuput(log));
	}
}