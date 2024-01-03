import { Button } from '#/components/shared/ui/Button/Button';
import Recognizer from '#/recognizer';
import { Delete, Mic, MicOff } from 'lucide-react';
const recognizer = new Recognizer();

type Props = {
	setNote: (str: string) => void
	onClear: () => void
	note: string
}

const WriteComponent = ({setNote, note, onClear}: Props) => {
	
		recognizer.setSaveResultFunc(setNote);
		recognizer.result = note;

		const clear = () => {
			onClear()
			recognizer.stop()
		}
		

		return (
			
					<div className='flex flex-col md:flex-row gap-4 justify-center'>
						<Button
							rounded='m'
							variant='danger'
							className='md:w-40'
							onClick={clear}>
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
		)
					
};

export default WriteComponent;
