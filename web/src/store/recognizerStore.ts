import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface RecogniserState {
	note: string;
	time: Date;
	setNote: (note: string) => void;
	clearNote: () => void;
	setTime: (time: Date) => void;
}

export const useRecogniserStore = create<RecogniserState>()(
	devtools(
		persist(
			(set) => ({
				note: '',
				time: new Date (),
				setNote: (note) => set({ note: note }),
				clearNote: () => set({ note: '' }),
				setTime: (time) => set({ time:  time }),
			}),
			{
				name: 'note-storage',
			}
		)
	)
);

interface Replacments {
	replacements: { substring: string; symbol: string }[];
	addReplacement: (substring: string, symbol: string) => void;
	deleteReplacement: (substring: string) => void;
	changeReplacement: (substring: string, symbol: string) => void;
}

export const useReplacements = create<Replacments>()(
	devtools(
		persist(
			set => ({
				replacements: [{ substring: ' точка', symbol: '.' }],
				addReplacement: (substring, symbol) =>
					set(state => ({
						replacements: [...state.replacements, { substring, symbol }],
					})),
				changeReplacement: (substring, symbol) =>
					set(state => ({
						replacements: state.replacements.map(item => {
							if (item.substring === substring) {
								return { substring, symbol };
							}
							return item;
						}),
					})),
				deleteReplacement: substring =>
					set(state => ({
						replacements: state.replacements.filter(
							item => item.substring !== substring
						),
					})),
			}),
			{
				name: 'replacments-storage',
			}
		)
	)
);
