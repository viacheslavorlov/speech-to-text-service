'use client';
import { client } from '#/apolo-client';
import { Textarea } from '#/components/shared/Textarea';
import { Button } from '#/components/shared/ui/Button/Button';
import { Container } from '#/components/shared/ui/Container/Container';
import { CREATE_NOTE } from '#/gql';
import { useUser } from '#/lib/login/userStore';
import { sentenceModify } from '#/lib/textModifiers';
import { useRecogniserStore } from '#/store/recognizerStore';
import { ApolloProvider, useMutation } from '@apollo/client/react';
import { redirect } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { WriteComponentDynamic } from './components/WriteComponentDynamic';

export default function Home() {
	const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
	const { id, jwt } = useUser();

	const { note, setNote, clearNote } = useRecogniserStore(state => state);

	const [creatNote] = useMutation(CREATE_NOTE, {
		context: {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		},
	});

	const onCahge = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value);
	};

	const handelSendNote = () => {
		creatNote({ variables: { note, user: id } });
	};

	useLayoutEffect(() => {
		if (!id) {
			redirect('/forbidden');
		}
	}, [id]);

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
