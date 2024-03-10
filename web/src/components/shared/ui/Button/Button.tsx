import clsx from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
	rounded?: 's' | 'm' | 'l';
	padding?: '1' | '2' | '3' | '4'
};

export const Button = ({ children, rounded = 'm', className, padding = '4', variant = 'primary', ...otherProps }: Props) => {
	return (
		<button
			{...otherProps}
			className={clsx(
				'flex justify-center gap-3 items-center text-white font-bold',
				'hover:scale-105 transition-all',
				'p-' + padding,
				rounded === 's' && 'rounded-md',
				rounded === 'm' && 'rounded-2xl',
				rounded === 'l' && 'rounded-full',
				variant === 'primary' && 'bg-green-600',
				variant === 'secondary' && 'bg-orange-500',
				variant === 'danger' && 'bg-red-600',
				variant === 'ghost' && 'bg-transparent border border-slate-50',
				'disabled:bg-gray disabled:pointer-events-none',
				className
			)}>
			{children}
		</button>
	);
};
