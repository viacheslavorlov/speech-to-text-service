export const sentenceModify = (str: string) => {
	return str
		.split('. ')
		.map(sentence => sentence.slice(0, 1).toLocaleUpperCase() + sentence.slice(1))
		.join('. ')
};

export const replacer = (str: string, replacements: {substring: string, symbol: string}[]) => {
	let result = str
	console.log(replacements)
	replacements.forEach(repl => result = result.replace(new RegExp(repl.substring, 'g'), repl.symbol));
	console.log(result)
	return result;
  }
