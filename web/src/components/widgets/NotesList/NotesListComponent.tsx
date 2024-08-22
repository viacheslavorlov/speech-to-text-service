import React from 'react';
import { NoteCard } from '#/components/shared/ui/NoteCard';
import { NoteEntityResponseCollection } from '#/graphql/__generated__/graphql';
import { Filter } from '#/app/types';

interface NotesListComponentProps {
	data:
		| {
				notes: NoteEntityResponseCollection;
		  }
		| undefined;
	filter: Filter;
	pageData: any;
	selectedNotes: string[];
	handleNoteCheckboxChange: (id: string) => void;
}

const NotesListComponent: React.FC<NotesListComponentProps> = ({
	data,
	filter,
	pageData,
	selectedNotes,
	handleNoteCheckboxChange,
}) => {
	const notes = () => {
		if (!data || !data.notes || !data.notes.data || data.notes.data.length === 0) return [];
		switch (filter) {
			case 'id':
				return data?.notes?.data?.sort((a, b) => parseInt(a?.id!) - parseInt(b?.id!));
			case 'title':
				return data?.notes?.data?.sort((a, b) => {
					if (a?.attributes?.title! > b?.attributes?.title!) {
						return 1;
					}
					if (a?.attributes?.title! < b?.attributes?.title!) {
						return -1;
					} else {
						return 0;
					}
				});
			case 'date':
				return data?.notes?.data?.sort(
					(a, b) =>
						new Date(a.attributes?.createdAt).getTime() -
						new Date(b.attributes?.createdAt).getTime()
				);
			case 'content':
				return data?.notes?.data?.sort((a, b) => {
					if (a?.attributes?.content! > b?.attributes?.content!) {
						return 1;
					}
					if (a?.attributes?.content! < b?.attributes?.content!) {
						return -1;
					} else {
						return 0;
					}
				});
			case 'id-reverse':
				return data.notes.data.sort((a, b) => parseInt(b?.id!) - parseInt(a?.id!));
			case 'title-reverse':
				return data?.notes?.data?.sort((a, b) => {
					if (a?.attributes?.title! > b?.attributes?.title!) {
						return -1;
					}
					if (a?.attributes?.title! < b?.attributes?.title!) {
						return 1;
					} else {
						return 0;
					}
				});
			case 'date-reverse':
				return data?.notes?.data?.sort(
					(a, b) =>
						new Date(b.attributes?.createdAt).getTime() -
						new Date(a.attributes?.createdAt).getTime()
				);
			case 'content-reverse':
				return data?.notes?.data?.sort((a, b) => {
					if (b?.attributes?.content! > a?.attributes?.content!) {
						return 1;
					}
					if (b?.attributes?.content! < a?.attributes?.content!) {
						return -1;
					} else {
						return 0;
					}
				});
			default:
				return data.notes.data;
		}
	};

	return (
		<ul className='flex flex-col gap-4'>
			{data?.notes &&
				notes().map(item => (
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
	);
};

export default NotesListComponent;
