export const sentenceModify = (str: string) => {
	return str
		.split('. ')
		.map(sentence => sentence.slice(0, 1).toLocaleUpperCase() + sentence.slice(1))
		.join('. ')
};

export const replacer = (str: string, substr: string, symbol: string) => {
	console.log(str.replace(substr, symbol))
	return str.replace(substr, symbol);
}