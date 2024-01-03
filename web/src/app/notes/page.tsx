"use client"
import { Container } from '#/components/shared/ui/Container/Container';
import { LoadingSpinner } from '#/components/shared/ui/LoadingSpinner';
import { NotesList } from '#/components/widgets/NotesList';
import { useUser } from '#/lib/login/userStore';
import { redirect } from 'next/navigation';
import { Suspense, useLayoutEffect } from 'react';

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
			<Suspense fallback={<LoadingSpinner />}>
				<NotesList />
			</Suspense>
		</Container>
	);
}
