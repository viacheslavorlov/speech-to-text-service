class Recognizer {
	private recognizer: SpeechRecognition;
	private saveResultFunc: (str: string) => void;
	public result: string;

	constructor() {
		this.recognizer = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
		this.recognizer.lang = 'ru-RU';
		this.recognizer.continuous = true;
		this.recognizer.interimResults = false;
		this.result = '';
		this.saveResultFunc = this.defaultSaveResultFunc;
		this.recognizer.onresult = (event: SpeechRecognitionEvent) => {
			// Получаем результат распознавания
			const result = event.results?.[event.resultIndex];
	
			if (result.isFinal) {
				if (result[0].transcript.includes('стоп')) {
					this.stop();
					return
				}
				
				this.saveResultFunc(this.result + result[0].transcript + '.');
			}
		};
	}

	public speech = (): void => {
		// Начинаем слушать микрофон и распознавать голос
		this.recognizer.start();
		console.log(this.result, this.saveResultFunc)
	};

	private defaultSaveResultFunc = (str: string): void => {
		// Действия по умолчанию для сохранения результата
		console.log(str);
	};
	public setSaveResultFunc = (saveResultFunc: (str: string) => void): void => {
		this.saveResultFunc = saveResultFunc;
	};

	public stop = (): void => {
		this.recognizer.stop();
		this.recognizer.abort();
	};
}
const recognizer = new Recognizer();

export { recognizer };
