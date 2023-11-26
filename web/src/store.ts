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
				setNote: (note) => set((state) => ({ note: state.note = note })),
				clearNote: () => set((state) => ({ note: state.note = '' })),
				setTime: (time) => set((state) => ({ time: state.time = time })),
			}),
			{
				name: 'note-storage',
			}
		)
	)
);
