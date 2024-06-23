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
import { useRouter } from 'next/navigation';
import { Suspense, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../../shared/ui/Button/Button';
import { Filter } from '#/app/types';
import FilterComponent from './FilterComponent';
import NotesListComponent from './NotesListComponent';

export function NotesList() {
    const { jwt, id } = useUser();
    const { push } = useRouter();

    useLayoutEffect(() => {
        if (!jwt || !id) {
            push('/forbidden');
        }
    }, [id, jwt, push]);

    const {
        data: pageData,
        loading: pageLoading,
        error: pageError,
    } = useQuery<{ notesListPageData: NotesListPageDataEntityResponse }>(GET_NOTES_PAGE_DATA);

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
			const [deleteNote] = useMutation(DELETE_NOTE);

    const [filter, setFilter] = useState<Filter>('id');
    const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
    // const ulRef = useRef<HTMLUListElement>(null);

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
                <FilterComponent filter={filter} setFilter={setFilter} />
                <NotesListComponent
                    data={data}
                    filter={filter}
                    pageData={pageData}
                    selectedNotes={selectedNotes}
                    handleNoteCheckboxChange={handleNoteCheckboxChange}
                />
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
// 'use client';
// import { Error } from '#/components/shared/Error/Error';
// import { LoadingSpinner } from '#/components/shared/ui/LoadingSpinner';
// import { NoteCard } from '#/components/shared/ui/NoteCard';
// import { DELETE_NOTE, GET_NOTES, GET_NOTES_PAGE_DATA } from '#/gql';
// import {
// 	NotesListPageDataEntityResponse,
// 	type NoteEntityResponseCollection,
// } from '#/graphql/__generated__/graphql';
// import { useUser } from '#/lib/login/userStore';
// import { useMutation, useQuery } from '@apollo/client';
// import { useRouter } from 'next/navigation';
// import { Suspense, useLayoutEffect, useRef, useState } from 'react';
// import { Button } from '../../shared/ui/Button/Button';
// import { Filter } from '#/app/types';
// import { ChevronDown } from 'lucide-react';

// export function NotesList() {
// 	const { jwt, id } = useUser();
// 	const { push } = useRouter();

// 	useLayoutEffect(() => {
// 		if (!jwt || !id) {
// 			push('/forbidden');
// 		}
// 	}, [id, jwt, push]);

// 	const {
// 		data: pageData,
// 		loading: pageLoading,
// 		error: pageError,
// 	} = useQuery<{ notesListPageData: NotesListPageDataEntityResponse }>(GET_NOTES_PAGE_DATA);

// 	const { data, loading, error, networkStatus, refetch } = useQuery<{
// 		notes: NoteEntityResponseCollection;
// 	}>(GET_NOTES, {
// 		fetchPolicy: 'no-cache',
// 		context: {
// 			headers: {
// 				Authorization: `Bearer ${jwt}`,
// 			},
// 		},
// 		variables: {
// 			userId: id,
// 		},
// 	});

// 	const [filter, setFilter] = useState<Filter>('id');

// 	const notes = () => {
// 		if (!data || !data.notes || !data.notes.data || data.notes.data.length === 0) return [];
// 		switch (filter) {
// 			case 'id':
// 				return data.notes.data.sort((a, b) => parseInt(a?.id) - parseInt(b?.id));
// 			case 'title':
// 				return data?.notes?.data?.sort((a, b) => {
// 					if (a?.attributes?.title > b?.attributes?.title) {
// 						return 1;
// 					}
// 					if (a?.attributes?.title < b?.attributes?.title) {
// 						return -1;
// 					} else {
// 						return 0;
// 					}
// 				});
// 			case 'date':
// 				return data?.notes?.data?.sort(
// 					(a, b) =>
// 						new Date(a.attributes?.createdAt).getTime() -
// 						new Date(b.attributes?.createdAt).getTime()
// 				);
// 			case 'content':
// 				return data?.notes?.data?.sort((a, b) => {
// 					if (a?.attributes?.content > b?.attributes?.content) {
// 						return 1;
// 					}
// 					if (a?.attributes?.content < b?.attributes.content) {
// 						return -1;
// 					} else {
// 						return 0;
// 					}
// 				});
// 			case 'id-reverse':
// 				return data.notes.data.sort((a, b) => parseInt(b?.id) - parseInt(a?.id));
// 			case 'title-reverse':
// 				return data?.notes?.data?.sort((a, b) => {
// 					if (a?.attributes?.title > b?.attributes?.title) {
// 						return -1;
// 					}
// 					if (a?.attributes?.title < b?.attributes?.title) {
// 						return 1;
// 					} else {
// 						return 0;
// 					}
// 				});
// 			case 'date-reverse':
// 				return data?.notes?.data?.sort(
// 					(a, b) =>
// 						new Date(b.attributes?.createdAt).getTime() -
// 						new Date(a.attributes?.createdAt).getTime()
// 				);
// 			case 'content-reverse':
// 				return data?.notes?.data?.sort((a, b) => {
// 					if (b?.attributes?.content > a?.attributes?.content) {
// 						return 1;
// 					}
// 					if (b?.attributes?.content < a?.attributes.content) {
// 						return -1;
// 					} else {
// 						return 0;
// 					}
// 				});
// 			default:
// 				return data.notes.data;
// 		}
// 	};

// 	const [deleteNote] = useMutation(DELETE_NOTE);
// 	const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
// 	const ulRef = useRef<HTMLUListElement>(null);

// 	const settingFilterUp = (e: any, currentFilter: Filter) => {
// 		const filterName = e.target.dataset.name as Filter;

// 		if (currentFilter === filterName) {
// 			setFilter((filterName + '-reverse') as Filter);
// 		} else if (currentFilter === filterName + '-reverse') {
// 			setFilter(filterName);
// 		} else {
// 			setFilter(filterName);
// 		}
// 	};

// 	console.log('filter', filter);

// 	const handleNoteCheckboxChange = (id: string) => {
// 		if (selectedNotes.includes(id)) {
// 			setSelectedNotes(selectedNotes.filter(noteId => noteId !== id));
// 		} else {
// 			setSelectedNotes([...selectedNotes, id]);
// 		}
// 	};

// 	const onDeleteSelectedNotes = async () => {
// 		selectedNotes.forEach(noteId => {
// 			deleteNote({
// 				variables: { id: noteId },
// 				context: {
// 					headers: {
// 						Authorization: `Bearer ${jwt}`,
// 					},
// 				},
// 			})
// 				.then(() => refetch())
// 				.then(() => setSelectedNotes([]));
// 		});
// 	};

// 	if (networkStatus === 4 || error || pageError) return <Error />;
// 	if (loading && pageLoading) return <LoadingSpinner />;
// 	if (data && pageData) {
// 		return (
// 			<Suspense>
// 				<h1 className='text-4xl font-bold'>
// 					{pageData.notesListPageData.data?.attributes?.title}
// 				</h1>
// 				<div className='hidden lg:flex items-center lg:gap-6 border-b w-full'>
// 					<div className='shrink-0 w-8 hidden lg:block'></div>
// 					<div
// 						className='shrink-0 lg:w-24 flex gap-1'
// 						data-name='id'
// 						onClick={e => settingFilterUp(e, filter)}>
// 						Номер <ChevronDown data-name='id' />
// 					</div>
// 					<div
// 						className='shrink-0 lg:w-24 flex gap-1'
// 						data-name='date'
// 						onClick={e => settingFilterUp(e, filter)}>
// 						Дата <ChevronDown data-name='date' />
// 					</div>
// 					<div
// 						className='shrink-0 lg:w-48 flex gap-1'
// 						data-name='title'
// 						onClick={e => settingFilterUp(e, filter)}>
// 						Название <ChevronDown data-name='title' />
// 					</div>
// 					<div
// 						className='flex gap-1'
// 						data-name='content'
// 						onClick={e => settingFilterUp(e, filter)}>
// 						Заметка <ChevronDown data-name='content' />
// 					</div>
// 				</div>

// 				<ul
// 					ref={ulRef}
// 					className='flex flex-col gap-4'>
// 					{data &&
// 						notes().map(item => (
// 							<NoteCard
// 								detailsButton={
// 									pageData.notesListPageData.data?.attributes?.detailsButton ||
// 									'Подробнее'
// 								}
// 								handleNoteCheckboxChange={handleNoteCheckboxChange} //@ts-ignore
// 								item={item}
// 								key={item.id}
// 								selctedNotes={selectedNotes}
// 							/>
// 						))}
// 				</ul>
// 				<Button
// 					variant='danger'
// 					rounded='m'
// 					className='hidden md:block'
// 					onClick={onDeleteSelectedNotes}>
// 					{pageData?.notesListPageData.data?.attributes?.deleteButton}
// 				</Button>
// 			</Suspense>
// 		);
// 	}
// }
// export default NotesList;
