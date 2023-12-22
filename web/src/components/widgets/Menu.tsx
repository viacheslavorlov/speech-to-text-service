'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '../shared/ui/Container/Container';
import clsx from 'clsx';
import { LoadingSpinner } from '../shared/LoadingSpinner';

export const Menu = () => {
	const { isLoaded, user } = useUser();
	const pathname = usePathname();

	return (
		<Container className='p-4'>
			<nav className='w-full justify-center align-center gap-10 flex'>
				<Link
					className={clsx(
						`p-4 font-bold rounded-2xl`,
						pathname === '/write'
							? 'bg-green-700'
							: 'bg-transparrent border border-slate-50',
						'hover:scale-105 transition-all'
					)}
					href={'/write'}>
					Главная
				</Link>
				{isLoaded && !user && (
					<Link
						className={`p-4 font-bold  transition-all rounded-2xl hover:scale-105 ${
							pathname === '/login'
								? 'bg-green-700'
								: 'bg-transparrent border border-slate-50'
						}`}
						href={'/login'}>
						Войти
					</Link>
				)}
				{isLoaded && user && (
					<>
						<Link
							className={`p-4 font-bold hover:scale-105  transition-all rounded-2xl ${
								pathname === '/notes'
									? 'bg-green-700'
									: 'bg-transparrent border border-slate-50'
							}`}
							href={'/notes'}>
							Записи
						</Link>
						<div className='ml-auto hover:scale-105  transition-all'>
							<UserButton appearance={{layout: {socialButtonsPlacement: 'bottom'}}} afterSignOutUrl='/' />
						</div>
					</>
				)}
				{!isLoaded && <LoadingSpinner/>}
			</nav>
		</Container>
	);
};
