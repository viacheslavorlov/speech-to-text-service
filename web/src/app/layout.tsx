'use client';
import { client } from '#/apolo-client';
import { ApolloProvider } from '@apollo/client';
import { Inter } from 'next/font/google';
import './globals.css';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';


if (process.env.NODE_ENV === 'development') {
	// Adds messages only in a dev environment
	loadDevMessages();
	loadErrorMessages();
}

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className='bg-red-600 text-center text-lg p-2'>
					Разрешите странице использование микрофона
				</div>
				<ApolloProvider client={client}>
					{children}
				</ApolloProvider>
			</body>
		</html>
	);
}
