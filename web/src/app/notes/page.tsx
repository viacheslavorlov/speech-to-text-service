import { LoadingSpinner } from '#/components/shared/LoadingSpinner';
import { Container } from '#/components/shared/ui/Container/Container';
import { NotesList } from '#/components/widgets/NotesList';
import { Suspense } from 'react';

export default function Notes() {
	return (
		<Container>
			<h1 className='text-3xl font-bold'>Заметки</h1>
			<Suspense fallback={<LoadingSpinner />}>
				<NotesList />
			</Suspense>
		</Container>
	);
}
