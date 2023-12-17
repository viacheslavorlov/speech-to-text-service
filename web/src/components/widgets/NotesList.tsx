'use client';
import { DELETE_NOTE, GET_NOTES } from '#/gql';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Button } from '../shared/ui/Button/Button';

export const NotesList = () => {
	const { data, loading, error, networkStatus, refetch } = useQuery(GET_NOTES, {
		fetchPolicy: 'cache-and-network',
	});
	const notes = data?.notes.data;
	const [deleteNote] = useMutation(DELETE_NOTE);
	const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
	const ulRef = useRef<HTMLUListElement>(null);

	const handleNoteCheckboxChange = (id: string) => {
		if (selectedNotes.includes(id)) {
			setSelectedNotes(selectedNotes.filter(noteId => noteId !== id));
		} else {
			setSelectedNotes([...selectedNotes, id]);
		}
	};

	const onDeleteSelectedNotes = async () => {
		selectedNotes.forEach(id => {
			deleteNote({ variables: { id: id } })
			.then(()=> refetch())
			.then(() => setSelectedNotes([])	)
		});
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	if (networkStatus === 4) return <p>No internet connection</p>;

	return (
		<>
			<ul
				ref={ulRef}
				className='flex flex-col gap-4'>
				{notes &&
					notes.map(
						(item: {
							attributes: { content: string };
							id: string;
							__typename: string;
						}) => (
							<li
								key={item.id}
								className={'flex flex-col md:flex-row justify-between  items-center gap-4'}>
								<div className='flex flex-col md:flex-row border-b w-full'>
									<input
										id={`note-${item.id}`}
										type='checkbox'
										name='delete-checkbox'
										className='p-4 mr-4 hidden md:block'
										checked={selectedNotes.includes(item.id)}
										onChange={() => handleNoteCheckboxChange(item.id)}
									/>
									<p className='p-4'>{item.id}</p>
									<p className='text-justify'>{item.attributes.content}</p>
								</div>

								<Link className='w-full md:w-auto' href={`notes/${item.id}`}>
									<Button className='w-full md:w-auto'>Подробно</Button>
								</Link>
							</li>
						)
					)}
			</ul>
			<Button
				variant='danger'
				rounded='m'
				className='hidden md:block'
				onClick={onDeleteSelectedNotes}>
				Удалить выбранные
			</Button>
		</>
	);
};
