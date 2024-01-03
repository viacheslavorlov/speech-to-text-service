'use client';
import { client } from '#/apolo-client';
import { Menu } from '#/components/widgets/Menu';
import { ApolloProvider } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
// import { ClerkProvider } from '@clerk/nextjs';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import './globals.css';

if (process.env.NODE_ENV === 'development') {
	// Adds messages only in a dev environment
	loadDevMessages();
	loadErrorMessages();
}

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		// <ClerkProvider>
			<html lang='en'>
				<body className={clsx(inter.className, 'transition-all')}>
					<main>
						<div className='bg-red-600 text-center text-lg p-2'>
							Разрешите странице использование микрофона
						</div>
						<Menu />
						<ApolloProvider client={client}>{children}</ApolloProvider>
					</main>
				</body>
			</html>
		// </ClerkProvider>
	);
}
