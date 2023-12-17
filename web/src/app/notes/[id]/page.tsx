'use client';
import { Textarea } from '#/components/shared/Textarea';
import { Button } from '#/components/shared/ui/Button/Button';
import { Container } from '#/components/shared/ui/Container/Container';
import { GET_ONE_NOTE, UPDATE_NOTE } from '#/gql';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { ChangeEvent, Suspense, useEffect, useState } from 'react';

// export const generateStaticParams = async () => {
// 	const data = await request('http://localhost:1337/graphql', GET_NOTES);

// 	return data.notes.data.map(note => {
// 		return {
// 			params: {
// 				id: note.id,
// 			},
// 		};
// 	});
// };

// const getNote = async (id: string) => {
// 	console.log(id);
// 	const data = await request('http://localhost:1337/graphql', GET_ONE_NOTE, { id: id });

// 	return {
// 		note: data?.note?.data,
// 	};
// };

export default function NoteSLug() {
	const param = useParams();
	const { data, loading, error } = useQuery(GET_ONE_NOTE, {
		variables: {
			id: param.id,
		},
	});
	const [redactionAvailable, setRedactionAvailable] = useState(false);
	const [notteText, setNoteText] = useState<string>('');
	const [id, setId] = useState('');
	const [chengable, setChengable] = useState(false);

	const [updateNote] = useMutation(UPDATE_NOTE, {
		variables: {
			id: id,
			content: notteText,
		},
	});

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setNoteText(e.target.value);
	};

	const onSave = () => {
		updateNote();
	};
	useEffect(() => {
		if (!loading && data && !error) {
			setNoteText(data.note.data.attributes.content);
			setId(data.note.data.id);
		}
	}, [loading, data, error]);
	if (loading || !data) {
		console.log('loading');

		return <h1>Loading</h1>;
	}

	if (error && !loading) {
		return <h1>Error ошибка получения данных с сервера...</h1>;
	}

	return (
		<Container>

			<Suspense fallback={<h1>Loading...</h1>}>
				<h1 className='font-bold text-2xl'>Заметка ID: {id}</h1>
				<div className='w-auto  pb-4 border-b'> <span className='font-bold'>Дата создания: </span>{new Date(data.note.data.attributes.createdAt).toLocaleString()}</div>
				{redactionAvailable && <div>{notteText}</div>}
				<Textarea
					chengable
					className='text-black w-full h-40'
					onChange={onChange}
					value={notteText}
				/>
				<div className='flex w-full gap-6'>
				<Button variant='danger' className='w-full'>Удалить</Button>
				<Button
					onClick={() => onSave()}
					className='w-full'>
					Сохранить
				</Button>
				</div>
				
			</Suspense>
		</Container>
	);
}
