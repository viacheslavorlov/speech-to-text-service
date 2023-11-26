import clsx from 'clsx';
import { useEffect, useState } from 'react';
type Props = {
	label: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
	placeholder?: string;
};
console.log('textarea render');

export const Textarea = ({ label, className, onChange, placeholder, value }: Props) => {
	const [isRedact, setIsRedact] = useState(false);
	const [textValue, setTextValue] = useState(value);

	useEffect(() => {
		setTextValue(value);
	}, [value]);

	const onCahge = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextValue(e.target.value);
		onChange?.(e);
	};

	if (!isRedact) {
		return (
			<div className={clsx('w-full p-2 flex flex-col gap-2', className)}>
				<div className='p-4 rounded-2xl text-black bg-white'>{textValue}</div>
				<button
					onClick={() => setIsRedact((prevState) => !prevState)}
					className='w-full p-4 bg-green-600 rounded-2xl'>
					Редактировать
				</button>
			</div>
		);
	}

	return (
		<div className={clsx('w-full h-[400px] p-2 flex flex-col gap-2', className)}>
			<label className='flex flex-col'>{label}: </label>
			<textarea
				onChange={onCahge}
				placeholder={placeholder}
				value={textValue}
				className='p-4 rounded-2xl text-black appearance-none h-full min-h-[100%]flex-grow'
			/>

			<button
				onClick={() => setIsRedact((prevState) => !prevState)}
				className='w-full bg-green-600 rounded-2xl'>
				Редактировать
			</button>
		</div>
	);
};
