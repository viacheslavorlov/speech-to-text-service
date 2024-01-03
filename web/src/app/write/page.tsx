'use client';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client/react';
import { WriteComponentDynamic } from './components/WriteComponentDynamic';
import { CREATE_NOTE, GET_NOTES } from '#/gql';
import { useLayoutEffect, useState } from 'react';
import { Textarea } from '#/components/shared/Textarea';
import { Button } from '#/components/shared/ui/Button/Button';
import { sentenceModify } from '#/lib/textModifiers';
import { client } from '#/apolo-client';
import { Container } from '#/components/shared/ui/Container/Container';
import { useRecogniserStore } from '#/store/recognizerStore';
import { redirect } from 'next/navigation';
import { useUser } from '#/lib/login/userStore';

export default function Home() {
	const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
	const { username } = useUser();

	const { note, setNote, clearNote } = useRecogniserStore(state => state);

	const { refetch } = useQuery(GET_NOTES);
	const [creatNote] = useMutation(CREATE_NOTE);

	const onCahge = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value);
	};

	const handelSendNote = () => {
		creatNote({ variables: { note } });
		refetch();
	};

	useLayoutEffect(() => {
		if (!username) {
			redirect('/forbidden');
		}
	}, [username]);

	return (
		<ApolloProvider client={client}>
			<Container>
				<WriteComponentDynamic
					setNote={setNote}
					onClear={clearNote}
					note={note}
				/>
				<h2 className='text-4xl font-bold'>Результат</h2>
				<Textarea
					value={note}
					chengable
					placeholder='say something'
					onChange={onCahge}
				/>
				<div>
					<Button
						onClick={() => {
							console.log('работает');
							setNote(sentenceModify(note.replace(/точка/g, '. ')));
						}}>
						Форматировать
					</Button>
					<Button
					//todo
					>
						Добавить правила
					</Button>
				</div>
				<Button
					variant='secondary'
					onClick={handelSendNote}>
					Отправить в БД
				</Button>
			</Container>
		</ApolloProvider>
	);
}
