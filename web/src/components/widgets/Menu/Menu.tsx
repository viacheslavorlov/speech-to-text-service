'use client';
// import { UserButton, useUser } from '@clerk/nextjs';
import { useUser } from '#/lib/login/userStore';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Button } from '../../shared/ui/Button/Button';
import { Container } from '../../shared/ui/Container/Container';
import { MenuIcon } from 'lucide-react';
import { MoblileMenu } from './MobileMenu';
import Image from 'next/image';

export const Menu = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [logedIn, setLogedIn] = useState(false);
	const { username, logOut } = useUser();
	const router = useRouter();
	const pathname = usePathname();

	const onLogOut = async () => {
		setLogedIn(false);
		logOut();
		router.replace('/');
	};

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (username) {
			setLogedIn(true);
		}
	}, [username]);
	return (
		<Container className='p-4'>
			<Suspense fallback=''>
				<div className='flex justify-between items-center md:hidden'>
					<Image
						src={'/kandinsky-3-logo.png'}
						width={300}
						height={200}
						alt='logo'
						className='w-20 h-20 object-cover rounded-lg'
					/>
					<Button
						onClick={toggleMenu}
						className='w-16 h-16'>
						<MenuIcon />
					</Button>
				</div>

				<MoblileMenu
					show={showMenu}
					toggleMenu={toggleMenu}
				/>
				<nav className='hidden md:flex items-center w-full gap-8'>
					<Image
						src={'/kandinsky-3-logo.png'}
						width={300}
						height={200}
						alt='logo'
						className='w-20 h-20 object-cover rounded-2xl'
					/>
					<Link
						className={clsx(
							`p-4 font-bold rounded-2xl`,
							pathname === '/write'
								? 'bg-green-700'
								: 'bg-transparrent border border-slate-50',
							'hover:scale-105 transition-all'
						)}
						href={'/write'}>
						Запись
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
						Запись через сервер
					</Link>
					{!logedIn ? (
						<Link
							className={`p-4 font-bold  transition-all rounded-2xl hover:scale-105 ml-auto ${
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
							className={
								'p-4 font-bold  transition-all rounded-2xl hover:scale-105 ml-auto'
							}
							onClick={onLogOut}>
							Выйти
						</Button>
					)}
				</nav>
			</Suspense>
		</Container>
	);
};
