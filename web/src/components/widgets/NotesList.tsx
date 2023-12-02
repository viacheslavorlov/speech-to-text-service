'use client'
import { DELETE_NOTE, GET_NOTES } from '#/gql';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRef, useState } from 'react';

export const NotesList = () => {
	const { data, loading, error, networkStatus } = useQuery(GET_NOTES);
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

	const onDeleteSelectedNotes = () => {
		selectedNotes.forEach(id => {
			deleteNote({ variables: { id } });
		});
		setSelectedNotes([]);
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
								className={'flex justify-between items-center gap-4'}>
								<input
									id={`note-${item.id}`}
									type='checkbox'
									name='delete-checkbox'
									checked={selectedNotes.includes(item.id)}
									onChange={() => handleNoteCheckboxChange(item.id)}
								/>
								{item.id + ' ' + item.attributes.content}{' '}
								<Link className='bg-green-700' href={`notes/${item.id}`}>Подробно</Link>
							</li>
						)
					)}
			</ul>
			<button
				className='bg-red-700 rounded-2xl p-4 h-auto'
				onClick={onDeleteSelectedNotes}>
				Удалить выбранные
			</button>
		</>
	);
};
