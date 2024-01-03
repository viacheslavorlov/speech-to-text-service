'use client';
// import { UserButton, useUser } from '@clerk/nextjs';
import { useUser } from '#/lib/login/userStore';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Button } from '../shared/ui/Button/Button';
import { Container } from '../shared/ui/Container/Container';

export const Menu = () => {
	const [logedIn, setLogedIn] = useState(false);
	const { username, logOut } = useUser();
	const router = useRouter();
	const pathname = usePathname();

	const onLogOut = async () => {
		setLogedIn(false);
		logOut();
		router.replace('/');
	};

	useEffect(() => {
		if (logedIn) {
			setTimeout(() => {
				router.replace('/write');
			}, 2500);
		}
	}, [logedIn, router]);

	useEffect(() => {
		if (username) {
			setLogedIn(true);
		}
	}, [username]);
	return (
		<Container className='p-4'>
			<Suspense fallback=''>
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
					<Link
						className={`p-4 font-bold hover:scale-105  transition-all rounded-2xl ${
							pathname === '/notes'
								? 'bg-green-700'
								: 'bg-transparrent border border-slate-50'
						}`}
						href={'/notes'}>
						Записи
					</Link>
					<Link
						className={`p-4 font-bold hover:scale-105  transition-all rounded-2xl ${
							pathname === '/write-to-server'
								? 'bg-green-700'
								: 'bg-transparrent border border-slate-50'
						}`}
						href={'/write-to-server'}>
						Записи через сервер
					</Link>
					{!logedIn ? (
						<Link
							className={`p-4 font-bold  transition-all rounded-2xl hover:scale-105 ${
								pathname === '/login'
									? 'bg-green-700'
									: 'bg-transparrent border border-slate-50'
							}`}
							href={'/login'}>
							Войти
						</Link>
					) : (
						<Button
							variant='ghost'
							className={'p-4 font-bold  transition-all rounded-2xl hover:scale-105'}
							onClick={onLogOut}>
							Выйти
						</Button>
					)}
				</nav>
			</Suspense>
		</Container>
	);
};
