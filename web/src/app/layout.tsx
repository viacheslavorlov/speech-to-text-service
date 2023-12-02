'use client';
import { client } from '#/apolo-client';
import { ApolloProvider } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { useParams, usePathname } from 'next/navigation';

if (process.env.NODE_ENV === 'development') {
	// Adds messages only in a dev environment
	loadDevMessages();
	loadErrorMessages();
}

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const route = usePathname();
	console.log(route);
	

	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className='bg-red-600 text-center text-lg p-2'>
					Разрешите странице использование микрофона
				</div>
				<nav className='w-full justify-center gap-10 flex'>
					<Link
						className={`p-4 font-bold rounded-2xl ${
							route === '/notes' ? 'bg-green-700' : 'bg-orange-700'
						}`}
						href={'/notes'}>
						Записи
					</Link>
					<Link
						className={`p-4 font-bold rounded-2xl ${
							route === '/' ? 'bg-green-700' : 'bg-orange-700'
						}`}
						href={'/'}>
						Главная
					</Link>
				</nav>
				<ApolloProvider client={client}>{children}</ApolloProvider>
			</body>
		</html>
	);
}
