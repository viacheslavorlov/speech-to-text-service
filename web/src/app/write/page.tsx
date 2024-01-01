'use client';
import { client } from '#/apolo-client';
import { Button } from '#/components/shared/ui/Button/Button';
import { Container } from '#/components/shared/ui/Container/Container';
import { CREATE_NOTE, GET_NOTES } from '#/gql';
import { sentenceModify } from '#/lib/textModifiers';
import { useRecogniserStore } from '#/store';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { Delete, Mic, MicOff } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '../../components/shared/Textarea';
import { recognizer } from '#/recognizer';



export default function Home() {
	const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

	const { note, setNote, clearNote } = useRecogniserStore(state => state);

	const { refetch } = useQuery(GET_NOTES);
	const [creatNote] = useMutation(CREATE_NOTE);

	const onCahge = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value);
	};


	if (window && typeof window !== undefined) {
		const handelSendNote = () => {
			creatNote({ variables: { note } });
			refetch();
		};

		const onClear = () => {
			clearNote();
			stop();
		};
		recognizer.setSaveResultFunc(setNote)
		recognizer.result = note

		return (
			<ApolloProvider client={client}>
				<Container>
					<div className='flex flex-col md:flex-row gap-4 justify-center'>
						<Button
							rounded='m'
							variant='danger'
							className='md:w-40'
							onClick={onClear}>
							Удалить <Delete />
						</Button>
						<Button
							rounded='m'
							variant='secondary'
							className='md:w-40'
							onClick={recognizer.stop}>
							Стоп <MicOff />
						</Button>
						<Button
							variant='primary'
							className='md:w-40'
							onClick={recognizer.speech}>
							Запись <Mic />
						</Button>
					</div>
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
						<Button>Добавить правила</Button>
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

	return null;
}
