'use client';
import { Container } from '#/components/shared/ui/Container/Container';
import { NotesListDynamic } from '#/components/widgets/NotesList/NotesListDynamic';
import { useUser } from '#/lib/login/userStore';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function Notes() {
	const { username } = useUser();
	useLayoutEffect(() => {
		if (!username) {
			redirect('/forbidden');
		}
	}, [username]);
	return (
		<Container>
			<h1 className='text-3xl font-bold'>Заметки</h1>
			<NotesListDynamic />
		</Container>
	);
}
