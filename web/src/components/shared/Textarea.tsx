import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';
type Props = {
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
		ref: ForwardedRef<HTMLTextAreaElement>
	) => {
		const onCahge = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			onChange?.(e);
		};

		if (!chengable) {
			return (
				<div className={clsx('w-full flex flex-col gap-2', className)}>
					<div className='p-4 rounded-2xl text-black bg-white'>{value}</div>
				</div>
			);
		}

		return (
			<div className={clsx('w-full h-[400px] flex flex-col gap-2', className)}>
				{lable && <label>{lable}</label>}
				<textarea
				ref={ref}
					placeholder={placeholder}
					value={value}
					className='p-4 rounded-2xl text-black appearance-none h-full flex-grow'
					onChange={onCahge}
				/>
			</div>
		);
	}
);
Textarea.displayName = 'Textarea';
