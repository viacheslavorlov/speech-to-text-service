import { Button } from '#/components/shared/ui/Button/Button';
import Recognizer from '#/recognizer';
import clsx from 'clsx';
import { Mic, MicOff, Save } from 'lucide-react';
import { useState } from 'react';
const recognizer = new Recognizer();

type Props = {
	setNote: (str: string) => void;
	// onClear: () => void
	sendNote: () => void;
	note: string;
	disable: boolean;
};

const WriteComponent = ({ setNote, note, sendNote, disable /* onClear */ }: Props) => {
	const [started,setStarted] = useState(false);
	recognizer.setSaveResultFunc(setNote);
	recognizer.result = note;

	const onStartRecord = () => {
		setStarted(true);
		recognizer.speech()
	};

	const onStopRecord = () => {
		setStarted(false);
		recognizer.stop()
	};
	
	console.log(recognizer.isRecording);

	return (
		<div className='flex flex-col md:flex-row gap-4 justify-center'>
			{/* <Button
							rounded='m'
							variant='danger'
							className='md:w-40'
							onClick={clear}>
							Удалить <Delete />
						</Button> */}
			<Button
				disabled={disable}
				rounded='m'
				variant='secondary'
				className='md:w-40'
				onClick={onStopRecord}>
				Стоп <MicOff />
			</Button>
			<Button
				disabled={disable}
				variant='primary'
				className='md:w-40'
				onClick={onStartRecord}>
				Запись <Mic className={clsx(recognizer.isRecording ? 'animate-ping' : '')} />
			</Button>
			<Button
				disabled={disable}
				variant='primary'
				onClick={sendNote}>
				Отправить в БД <Save />
			</Button>
		</div>
	);
};

export default WriteComponent;
