'use client';
import { Error } from '#/components/shared/Error/Error';
import { LoadingSpinner } from '#/components/shared/ui/LoadingSpinner';
import { NoteCard } from '#/components/shared/ui/NoteCard';
import { DELETE_NOTE, GET_NOTES, GET_NOTES_PAGE_DATA } from '#/gql';
import {
	NotesListPageDataEntityResponse,
	type NoteEntityResponseCollection,
} from '#/graphql/__generated__/graphql';
import { useUser } from '#/lib/login/userStore';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { Suspense, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../../shared/ui/Button/Button';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';

if (process.env.NODE_ENV === 'development') {
	// Adds messages only in a dev environment

	loadDevMessages();

	loadErrorMessages();
}

export function NotesList() {
	const { jwt, id } = useUser();
	const { push } = useRouter();
	useLayoutEffect(() => {
		if (!jwt || !id) {
			push('/forbidden');
		}
	}, [id, jwt, push]);
	// const pageData = await getNotesListPageData(jwt)
	const {
		data: pageData,
		loading: pageLoading,
		error: pageError,
	} = useQuery<{ notesListPageData: NotesListPageDataEntityResponse }>(GET_NOTES_PAGE_DATA);
	console.log('pageData', pageData);

	const { data, loading, error, networkStatus, refetch } = useQuery<{
		notes: NoteEntityResponseCollection;
	}>(GET_NOTES, {
		fetchPolicy: 'network-only',
		context: {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		},
		variables: {
			userId: id,
		},
	});
	const notes = data?.notes.data;
	const [deleteNote] = useMutation(DELETE_NOTE);
	const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
	const ulRef = useRef<HTMLUListElement>(null);
	console.log('data, id, jwt', data, id, jwt);

	const handleNoteCheckboxChange = (id: string) => {
		if (selectedNotes.includes(id)) {
			setSelectedNotes(selectedNotes.filter(noteId => noteId !== id));
		} else {
			setSelectedNotes([...selectedNotes, id]);
		}
	};

	const onDeleteSelectedNotes = async () => {
		selectedNotes.forEach(noteId => {
			deleteNote({
				variables: { id: noteId },
				context: {
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			})
				.then(() => refetch())
				.then(() => setSelectedNotes([]));
		});
	};

	if (networkStatus === 4 || error || pageError) return <Error />;
	if (loading && pageLoading) return <LoadingSpinner />;
	if (data && pageData) {
		return (
			<Suspense>
				<h1 className='text-4xl font-bold'>
					{pageData.notesListPageData.data?.attributes?.title}
				</h1>
				<ul
					ref={ulRef}
					className='flex flex-col gap-4'>
					{notes &&
						notes.map(item => (
							<NoteCard
								detailsButton={
									pageData.notesListPageData.data?.attributes?.detailsButton ||
									'Подробнее'
								}
								handleNoteCheckboxChange={handleNoteCheckboxChange} //@ts-ignore
								item={item}
								key={item.id}
								selctedNotes={selectedNotes}
							/>
						))}
				</ul>
				<Button
					variant='danger'
					rounded='m'
					className='hidden md:block'
					onClick={onDeleteSelectedNotes}>
					{pageData?.notesListPageData.data?.attributes?.deleteButton}
				</Button>
			</Suspense>
		);
	}
}

export default NotesList;
