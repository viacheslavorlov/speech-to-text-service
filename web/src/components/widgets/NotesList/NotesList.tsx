'use client';
import { Error } from '#/components/shared/Error/Error';
import { LoadingSpinner } from '#/components/shared/ui/LoadingSpinner';
import { DELETE_NOTE, GET_NOTES, GET_NOTES_PAGE_DATA } from '#/gql';
import {
	NotesListPageDataEntityResponse,
	type NoteEntityResponseCollection,
} from '#/graphql/__generated__/graphql';
import { useUser } from '#/lib/login/userStore';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense, useLayoutEffect, useRef, useState } from 'react';
import { textAdapt } from '../../../lib/textAdapt';
import { Button } from '../../shared/ui/Button/Button';

export function NotesList() {
	const { jwt, id } = useUser();
	const { push } = useRouter();
	useLayoutEffect(() => {
		if (!jwt || !id) {
			push('/forbidden');
		}
	}, []);
	// const pageData = await getNotesListPageData(jwt)
	const {
		data: pageData,
		loading: pageLoading,
		error: pageError,
	} = useQuery<{ notesListPageData: NotesListPageDataEntityResponse }>(GET_NOTES_PAGE_DATA);
	console.log(pageData);

	const { data, loading, error, networkStatus, refetch } = useQuery<{
		notes: NoteEntityResponseCollection;
	}>(GET_NOTES, {
		fetchPolicy: 'no-cache',
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
	console.log(data);

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
							<li
								key={item.id}
								className={
									'flex flex-col md:flex-row justify-between  items-center gap-4'
								}>
								<div className='flex flex-col md:flex-row items-center border-b w-full'>
									<input
										id={`note-${item.id}`}
										type='checkbox'
										name='delete-checkbox'
										className='p-4 mr-4 hidden md:block'
										checked={selectedNotes.includes(item?.id!)}
										onChange={() => handleNoteCheckboxChange(item?.id!)}
									/>
									<p className='p-4'>{item.id}</p>
									<p className='text-justify'>
										{textAdapt(item?.attributes!.title, 35, true)}
									</p>
								</div>

								<Link
									className='w-full md:w-auto'
									href={`notes/${item.id}`}>
									<Button className='w-full md:w-auto'>
										{
											pageData?.notesListPageData.data?.attributes
												?.detailsButton
										}
									</Button>
								</Link>
							</li>
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
