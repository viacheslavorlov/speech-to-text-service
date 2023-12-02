import { NotesList } from '#/components/widgets/NotesList';
import { Suspense } from 'react';

export default function Notes() {
	return (
		<>
			<h1 className='text-3xl font-bold'>Заметки</h1>
				<NotesList />
		</>
	);
}
