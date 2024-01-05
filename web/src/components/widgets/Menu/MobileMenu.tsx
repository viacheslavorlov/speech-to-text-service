import clsx from 'clsx';
import Link from 'next/link';

export const MoblileMenu = ({
	show,
	toggleMenu,
}: {
	show: boolean;
	toggleMenu: (state: boolean) => void;
}) => {
	if (!show) return null;
	return (
		<div
			className='fixed top-0 left-0 right-0 bottom-0 bg-slate-700/70'
			onClick={() => toggleMenu(false)}>
			<div className='md:hidden absolute top-12 right-0 bg-slate-800 border border-gray-300 shadow-md rounded-lg'>
				<nav className='flex flex-col p-4 gap-4'>
					<Link
						className={clsx(
							'p-4 font-bold rounded-2xl',
							'hover:scale-105 transition-all',
							'bg-green-700'
						)}
						href={'/write'}>
						Запись
					</Link>
					<Link
						className={clsx(
							'p-4 font-bold rounded-2xl',
							'hover:scale-105 transition-all',
							'bg-green-700'
						)}
						href={'/notes'}>
						Записи
					</Link>
					<Link
						className={clsx(
							'p-4 font-bold rounded-2xl',
							'hover:scale-105 transition-all',
							'bg-green-700'
						)}
						href={'/write-to-server'}>
						Запись через сервер
					</Link>
					<Link
						className={clsx(
							'p-4 font-bold rounded-2xl',
							'hover:scale-105 transition-all',
							'bg-green-700'
						)}
						href={'/login'}>
						Войти
					</Link>
				</nav>
			</div>
		</div>
	);
};
