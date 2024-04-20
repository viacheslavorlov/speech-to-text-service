'use client';

import { Button } from '#/components/shared/ui/Button/Button';
import { Container } from '#/components/shared/ui/Container/Container';
import { Textarea } from '#/components/shared/ui/Textarea';
import { CREATE_NOTE } from '#/gql';
import { useUser } from '#/lib/login/userStore';
import { sentenceModify } from '#/lib/textModifiers';
import { useServerRecogniserStore } from '#/store/recognizerStore';
import { useMutation } from '@apollo/client/react';
import axios from 'axios';
import { Delete, Mic } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

const RecorderComponent = () => {
	const [audioData, setAudioData] = useState<any>(null);
	const { note, setNote, clearNote } = useServerRecogniserStore();
	const [error, setError] = useState(null);
	const { jwt, id } = useUser();

	const handleAudioData = (data: any) => {
		console.log(data);
		setAudioData(data);
	};

	const [creatNote] = useMutation(CREATE_NOTE);
	const handelSendNote = () => {
		creatNote({
			variables: { note, user: id },
			context: {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			},
		});
	};

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value);
	};

	const handleSubmit = async () => {
		try {
			const response = await axios.post(
				process.env.NEXT_PUBLIC_LOCAL_SERVER_URL!,
				audioData,
				{
					headers: {
						'Content-Type': 'audio/webm',
					},
				}
			);
			setNote(note + response.data.text + '. ');
		} catch (error: any) {
			setError(error.message);
		}
	};
	return (
		<Container className=''>
			<AudioRecorder
				downloadFileExtension='webm'
				showVisualizer
				onRecordingComplete={handleAudioData}
				classes={{
					AudioRecorderClass: 'flex m-auto bg-green',
				}}
			/>
			<div className='flex flex-col md:flex-row gap-4 justify-center'>
				<Button
					rounded='m'
					variant='danger'
					className='md:w-40'
					onClick={clearNote}>
					Удалить <Delete />
				</Button>

				<Button
					variant='primary'
					className='md:w-40'
					onClick={handleSubmit}>
					Запись <Mic />
				</Button>
			</div>
			{/* {result && <p>{result}</p>} */}
			{error && <p>{error}</p>}
			<h2 className='text-4xl font-bold'>Результат</h2>
			<Textarea
				value={note || ''}
				chengable
				placeholder='say something'
				onChange={onChange}
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
	);
};

export default RecorderComponent;
