import { Button } from '#/components/shared/ui/Button/Button';
import Recognizer from '#/recognizer';
import { Delete, Mic, MicOff, Save } from 'lucide-react';
const recognizer = new Recognizer();

type Props = {
	setNote: (str: string) => void
	// onClear: () => void
	sendNote: () => void
	note: string
	disable: boolean
}

const WriteComponent = ({setNote, note, sendNote, disable /* onClear */}: Props) => {
	
		recognizer.setSaveResultFunc(setNote);
		recognizer.result = note;

		// const clear = () => {
		// 	onClear()
		// 	recognizer.stop()
		// }
		

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
							onClick={recognizer.stop}>
							Стоп <MicOff />
						</Button>
						<Button
							disabled={disable}
							variant='primary'
							className='md:w-40'
							onClick={recognizer.speech}>
							Запись <Mic />
						</Button>
						<Button
							disabled={disable}
						variant='primary'
						onClick={sendNote}>
						Отправить в БД <Save/>
					</Button>
					</div>
		)
					
};

export default WriteComponent;
