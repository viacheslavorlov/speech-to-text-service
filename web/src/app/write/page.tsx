'use client';
import { client } from '#/apolo-client';
import { Button } from '#/components/shared/ui/Button/Button';
import { Container } from '#/components/shared/ui/Container/Container';
import { CREATE_NOTE, GET_NOTES } from '#/gql';
import { useRecogniserStore } from '#/store';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { Delete, Mic, MicOff } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '../../components/shared/Textarea';

const listener = window.webkitSpeechRecognition;
const recognizer: SpeechRecognition = new listener();
recognizer.lang = 'ru-RU';
recognizer.continuous = true;
recognizer.interimResults = false;
function speech() {
	// Начинаем слушать микрофон и распознавать голос
	recognizer.start();
}
function stop() {
	recognizer.stop();
	recognizer.abort();
}

export default function Home() {
	const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

	const { note, setNote, clearNote } = useRecogniserStore(state => state);

	recognizer.onresult = event => {
		// Получаем результат распознавания
		const result = event.results?.[event.resultIndex];
		if (result.isFinal) {
			setNote(note + result[0].transcript);
		}
	};

	const { refetch } = useQuery(GET_NOTES);
	const [creatNote] = useMutation(CREATE_NOTE);

	const onCahge = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value);
	};
	const handelSendNote = () => {
		creatNote({ variables: { note } });
		refetch();
	};

	const onClear = () => {
		clearNote();
		stop();
	};

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
						onClick={stop}>
						Стоп <MicOff />
					</Button>
					<Button
						variant='primary'
						className='md:w-40'
						onClick={speech}>
						Запись <Mic />
					</Button>
				</div>
				<h2 className='text-4xl font-bold'>Результат</h2>
				<Textarea
					label='Результат'
					value={note}
					chengable
					placeholder='say something'
					onChange={onCahge}
				/>
				<Button
					variant='secondary'
					onClick={handelSendNote}>
					Отправить в БД
				</Button>
			</Container>
		</ApolloProvider>
	);
}
