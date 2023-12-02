'use client';
import { useRecogniserStore } from '#/store';
import { useState } from 'react';
import { Textarea } from '../components/shared/Input';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { client } from '#/apolo-client';
import { CREATE_NOTE, GET_NOTES } from '#/gql';
import { NotesList } from '../components/widgets/NotesList';

const listener= window.webkitSpeechRecognition;
const recognizer: SpeechRecognition  = new listener();
recognizer.lang = 'ru-RU';
    recognizer.continuous = true;
	recognizer.interimResults = true;
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

	const { note, setNote, clearNote } = useRecogniserStore((state) => state);

	recognizer.onresult = (event) => {
		// Получаем результат распознавания
		const result = event.results?.[event.resultIndex];
		if (result.isFinal) {
			setNote(note + '. ' + result[0].transcript);
		}
	};

	const { refetch } = useQuery(GET_NOTES);
	const [creatNote] = useMutation(CREATE_NOTE)
	

	const onCahge = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value);
	};
	const handelSendNote = () => {
		creatNote({variables: {note}})
		refetch()
	}

const onClear = () => {
	clearNote();
	stop();
};


	return (
		<ApolloProvider client={client}>
			<main className='flex min-h-screen flex-col items-center p-24 gap-8'>
				<div className='flex gap-4'>
					<button
						onClick={onClear}
						className='p-4 bg-red-600 rounded-2xl font-extrabold'>
						Удалить
					</button>
					<button
						onClick={stop}
						className='p-4 bg-yellow-800 rounded-2xl font-extrabold'>
						Стоп
					</button>
					<button
						onClick={speech}
						className='p-4 bg-green-600 rounded-2xl font-extrabold'>
						Запись
					</button>
				</div>

				<Textarea
					label='First input'
					value={note}
					placeholder='say something'
					onChange={onCahge}
				/>
				<button className={'bg-orange-600 p-4 rounded-2xl font-extrabold w-full'} onClick={handelSendNote}>Отправить в БД</button>
			</main>
		</ApolloProvider>
	);
}
