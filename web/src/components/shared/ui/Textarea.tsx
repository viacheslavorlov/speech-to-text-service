import clsx from 'clsx';
import { ForwardedRef, forwardRef, useEffect, useRef } from 'react';
type Props = {
	id?: string
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
	placeholder?: string;
	chengable?: boolean;
	lable?: string;
};

export const Textarea = forwardRef(
	(
		{ className, onChange, placeholder, value, chengable , lable}: Props,
		// ref: ForwardedRef<HTMLTextAreaElement>
	) => {
		const ref = useRef<HTMLTextAreaElement>(null)
		const onCahge = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			onChange?.(e);
			
		};

		useEffect(() => {
			if(ref.current) {
				ref.current.style.height = 'auto';
				ref.current.style.height = `${ref.current.scrollHeight}px`;
			}
		}, [value])

		if (!chengable) {
			return (
				<div className={clsx('w-full flex flex-col gap-2', className)}>
					<div className='p-4 rounded-2xl text-black bg-white'>{value}</div>
				</div>
			);
		}
		

		return (
			<div className={clsx('w-full flex h-full flex-col gap-2', className)}>
				{lable && <label>{lable}</label>}
				<textarea
				ref={ref}
					placeholder={placeholder}
					value={value}
					className='p-4 pr-8 resize-y h-auto w-full rounded-2xl text-black flex-grow'
					onChange={onCahge}
				/>
			</div>
		);
	}
);
Textarea.displayName = 'Textarea';
