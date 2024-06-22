'use client';
import { Input } from '#/components/shared/ui/Input/Input';
import { NoteCard } from '#/components/shared/ui/NoteCard';
import { Note } from '#/graphql/__generated__/graphql';
import { useUser } from '#/lib/login/userStore';
import { meilisearchClient } from '#/search/meilisearch';
import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
export const Search = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<Note[]>([]);
	const { id } = useUser();
	console.log('results', results);

	const handleSearch = useCallback(async () => {
		// // e.preventDefault();
		const searchResults = await meilisearchClient
			.index('note') // Указываете имя индекса
			.search(query, {
				filter: [`user.id = ${id}`],
			});
		//@ts-ignore
		setResults(searchResults.hits);
	}, [query, id]);
	const debouncedSearch = useDebouncedCallback(handleSearch, 450);

	useEffect(() => {
		debouncedSearch();
	}, [query, debouncedSearch]);

	return (
		<div className='space-y-4'>
			<form className='flex flex-col md:flex-row  items-center gap-2'>
				<h2 className='text-4xl font-bold'>Поиск: </h2>
				<Input
					className='text-black w-full'
					type='text'
					value={query}
					placeholder='введите название заметки или текст из неё'
					onChange={e => setQuery(e.target.value)}
				/>
				{/* <button type='submit'>Поиск</button> */}
			</form>

			{results.length > 0 && query.length > 0 && (
				<>
					<h2 className='text-4xl font-bold'>Результаты: </h2>
					<ul className='flex flex-col gap-4'>
						{results.map(note => (
							<NoteCard //@ts-ignore
								key={note.id}
								//@ts-ignore
								item={note}
								detailsButton='Подробнее'
							/> // Предполагается, что у ваших заметок есть заголовок
						))}
					</ul>
				</>
			)}
		</div>
	);
};
