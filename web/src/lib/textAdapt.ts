export const textAdapt = (text: string, length: number, dots: boolean) => {
	return text.slice(0, length) + dots ? '...' : '';
};
