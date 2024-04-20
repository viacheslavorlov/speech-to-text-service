'use client';
import { Button } from '#/components/shared/ui/Button/Button';
import type { Maybe, Note, NoteEntity } from '#/graphql/__generated__/graphql';
import { textAdapt } from '#/lib/textAdapt';
import Link from 'next/link';

type Props = {
	detailsButton: string;
	item: NoteEntity & Maybe<Note>;
	selctedNotes?: string[];
	handleNoteCheckboxChange?: (id: string) => void;
};

export const NoteCard = (props: Props) => {
	const { detailsButton, item, handleNoteCheckboxChange, selctedNotes } = props;
	return (
		<li
			key={item.id}
			className={'flex flex-col md:flex-row justify-between  items-center gap-4'}>
			<div className='flex flex-col md:flex-row items-center border-b w-full'>
				{handleNoteCheckboxChange && selctedNotes && (
					<input
						id={`note-${item.id}`}
						type='checkbox'
						name='delete-checkbox'
						className='p-4 mr-4 hidden md:block'
						checked={selctedNotes.includes(item?.id!)}
						onChange={() => handleNoteCheckboxChange(item?.id!)}
					/>
				)}
				<p className='p-4'>{item.id}</p>
				<p className='text-justify'>
					{textAdapt(item?.attributes?.title || item?.title, 35, true)}
				</p>
			</div>

			<Link
				className='w-full md:w-auto'
				href={`notes/${item.id}`}>
				<Button className='w-full md:w-auto'>{detailsButton}</Button>
			</Link>
		</li>
	);
};
