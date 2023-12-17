import clsx from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
	rounded?: 's' | 'm' | 'l';
};

export const Button = ({ children, rounded = 'm', className, variant = 'primary', ...otherProps }: Props) => {
	return (
		<button
			{...otherProps}
			className={clsx(
				'flex justify-center gap-3 items-center text-white font-bold p-4',
				'hover:scale-105 transition-all',
				rounded === 's' && 'rounded-md',
				rounded === 'm' && 'rounded-2xl',
				rounded === 'l' && 'rounded-full',
				variant === 'primary' && 'bg-green-600',
				variant === 'secondary' && 'bg-orange-500',
				variant === 'danger' && 'bg-red-600',
				variant === 'ghost' && 'bg-transparent border border-slate-50',
				className
			)}>
			{children}
		</button>
	);
};
