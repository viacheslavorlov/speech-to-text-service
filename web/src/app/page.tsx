'use client';
import { useRecogniserStore } from '#/store';
import { useState } from 'react';
import { Textarea } from './shared/Input';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client } from '../apolo-client';

const listener = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognizer = new listener();

export default function Home() {
	const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
	recognizer.lang = 'ru-RU';
	recognizer.interimResults = true;

	function speech() {
		// Начинаем слушать микрофон и распознавать голос
		recognizer.start();
		setIsSpeaking(true);
	}
	function stop() {
		recognizer.stop();
		recognizer.abort();
	}

	function clear() {
		recognizer.abort();
		setNote('');
	}

	const { note, setNote, clearNote } = useRecogniserStore((state) => state);

	recognizer.onresult = (event) => {
		// Получаем результат распознавания
		const result = event.results[event.resultIndex];
		if (result.isFinal) {
			setNote(result[0].transcript);
			console.log(note);
		}
	};

  useQuery

	const onCahge = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value);
	};

	console.log(recognizer);

	console.log('render');
	return (
		<ApolloProvider client={client}>
    
		<main className='flex min-h-screen flex-col items-center p-24'>
			<div className='flex gap-4'>
				<button
					onClick={clear}
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
		</main>
		</ApolloProvider>

	);
}
