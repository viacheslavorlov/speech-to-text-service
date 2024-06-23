'use client';
import { Button } from '#/components/shared/ui/Button/Button';
import type { Maybe, Note, NoteEntity } from '#/graphql/__generated__/graphql';
import { textAdapt } from '#/lib/textAdapt';
import Link from 'next/link';

type Props = {
	detailsButton: string;
	item: NoteEntity & Note;
	selctedNotes?: string[];
	handleNoteCheckboxChange?: (id: string) => void;
};

export const NoteCard = (props: Props) => {
	const { detailsButton, item, handleNoteCheckboxChange, selctedNotes } = props;
	
	return (
		<li
			key={item.id}
			className={'flex flex-col lg:flex-row justify-between  items-center gap-4'}>
			<div className='flex flex-col lg:flex-row items-center gap-4 lg:gap-6 border-b w-full'>
				{handleNoteCheckboxChange && selctedNotes && (
					<input
						id={`note-${item.id}`}
						type='checkbox'
						name='delete-checkbox'
						className='p-4 mr-4 hidden lg:block'
						checked={selctedNotes.includes(item?.id!)}
						onChange={() => handleNoteCheckboxChange(item?.id!)}
					/>
				)}
				<p className='p-0 w-full lg:w-24 shrink-0 '><span className="lg:hidden font-bold text-xl">Номер: </span>{item.id}</p>
				<p className='p-0 w-full lg:w-28 shrink-0 '><span className="lg:hidden font-bold text-xl">Дата: </span>{new Date(item?.attributes?.createdAt || item?.createdAt).toLocaleDateString() }</p>
				<p className='w-full shrink-0 lg:w-48 text-justify'>
					<span className="lg:hidden font-bold text-xl">Название: </span>
					{textAdapt(item?.attributes?.title || item?.title, 35, true)}
				</p>
				<p className='w-full  text-justify'>
				<span className="lg:hidden font-bold text-xl">Заметка: </span>
					{textAdapt(item?.attributes?.content || item?.content, 55, true)}
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
