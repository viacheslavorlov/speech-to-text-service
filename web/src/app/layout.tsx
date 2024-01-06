'use client';
import { client } from '#/apolo-client';
import { Button } from '#/components/shared/ui/Button/Button';
import { ApolloProvider } from '@apollo/client';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import './globals.css';
import { Menu } from '#/components/widgets/Menu/Menu';

// if (process.env.NODE_ENV === 'development') {
// 	// Adds messages only in a dev environment
// 	loadDevMessages();
// 	loadErrorMessages();
// }

const inter = Inter({ subsets: ['latin'] });
const SHOW_WARNING_KEY = 'SHOW_WARNING';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [showWarning, setShowWarning] = useState(true);

	const onCloseWarning = () => {
		setShowWarning(false);
		localStorage.setItem(SHOW_WARNING_KEY, 'false');
	};

	useEffect(() => {
		setShowWarning(JSON.parse(localStorage.getItem(SHOW_WARNING_KEY) || 'true'));
	}, []);
	return (
		<html lang='en'>
			<body className={clsx(inter.className, 'transition-all')}>
				<main className=' bg-slate-800 w-full h-full min-h-screen'>
					{showWarning && (
						<div className='bg-red-600 text-center text-lg relative h-auto px-8 py-2'>
							<Button
								onClick={onCloseWarning}
								className='rounded-full bg-red-600 absolute top-1 right-2 h-8 w-8 py-0 px-0'>
								<X className='w-6 h-6' />
							</Button>
							Разрешите странице использование микрофона.
							Используйте Google Chrome или Yandex Browser
						</div>
					)}
					<Menu />
					<ApolloProvider client={client}>{children}</ApolloProvider>
				</main>
			</body>
		</html>
	);
}
