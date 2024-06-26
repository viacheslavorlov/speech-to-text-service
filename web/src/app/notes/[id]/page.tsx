'use client';
import { Button } from '#/components/shared/ui/Button/Button';
import { Container } from '#/components/shared/ui/Container/Container';
import { LoadingSpinner } from '#/components/shared/ui/LoadingSpinner';
import { Textarea } from '#/components/shared/ui/Textarea';
import { DELETE_NOTE, GET_ONE_NOTE, UPDATE_NOTE } from '#/gql';
import { useUser } from '#/lib/login/userStore';
import { useMutation, useQuery } from '@apollo/client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChangeEvent, Suspense, memo, useEffect, useState } from 'react';

const NoteSLug = () => {
	const param = useParams();
	const { jwt, id } = useUser();
	const { data, loading, error } = useQuery(GET_ONE_NOTE, {
		variables: {
			id: param.id,
			userId: id,
		},
		context: {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		},
	});

	const [deleteNote] = useMutation(DELETE_NOTE, {
		variables: { id: param.id },
		context: {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		},
	});
	console.log(data);
	const [notteText, setNoteText] = useState<string>('');

	const [updateNote] = useMutation(UPDATE_NOTE, {
		variables: {
			id: param.id,
			content: notteText,
			title: data?.notes.data[0].attributes.title,
		},
		context: {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		},
	});

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setNoteText(e.target.value);
	};

	const onSave = () => {
		updateNote();
	};
	useEffect(() => {
		if (!loading && data.notes.data[0] && !error) {
			setNoteText(data.notes.data[0].attributes.content);
		}
	}, [loading, data, error]);
	if (loading) {
		console.log('loading');

		return <LoadingSpinner />;
	}

	if (error && !loading) {
		return <h1>Error ошибка получения данных с сервера...</h1>;
	}

	return (
		<Container className='relative'>
			<Suspense fallback={<LoadingSpinner />}>
				<Link href={'/notes'}>
					<Button className='absolute right-6 md:right-12 ml-auto w-36'>
						<ArrowLeft /> Назад
					</Button>
				</Link>
				<h1 className='font-bold text-2xl'>Заметка ID: {param.id}</h1>
				<div className='w-auto  pb-4 border-b'>
					{' '}
					<span className='font-bold'>Дата создания: </span>
					{new Date(data.notes.data[0].attributes.createdAt).toLocaleString()}
				</div>
				<Textarea
					chengable
					className='text-black w-full h-40'
					onChange={onChange}
					value={notteText}
				/>
				<div className='flex w-full gap-6'>
					<Button
						onClick={() => deleteNote()}
						variant='danger'
						className='w-full'>
						Удалить
					</Button>
					<Button
						onClick={() => onSave()}
						className='w-full'>
						Сохранить
					</Button>
				</div>
			</Suspense>
		</Container>
	);
};

export default memo(NoteSLug);
