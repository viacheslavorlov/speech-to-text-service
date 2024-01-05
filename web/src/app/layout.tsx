'use client';
import { client } from '#/apolo-client';
import { Menu } from '#/components/widgets/Menu';
import { ApolloProvider } from '@apollo/client';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect, useState } from 'react';

// if (process.env.NODE_ENV === 'development') {
// 	// Adds messages only in a dev environment
// 	loadDevMessages();
// 	loadErrorMessages();
// }

const inter = Inter({ subsets: ['latin'] });
const SHOW_WARNING_KEY = 'SHOW_WARNING'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [showWarning,setShowWarning] = useState(true)

	const onCloseWarning = () => {
		setShowWarning(false)
		// localStorage.setItem(G)
	}

	useEffect(() => {
		setShowWarning(JSON.parse(localStorage.getItem(SHOW_WARNING_KEY) || 'true'))
	}, [])
	return (
		<html lang='en'>
			<body className={clsx(inter.className, 'transition-all')}>
				<main>
					{showWarning && <div className='bg-red-600 text-center text-lg p-2 relative'>
						{/* <Button></Button> */}
						Разрешите странице использование микрофона
					</div>}
					<Menu />
					<ApolloProvider client={client}>{children}</ApolloProvider>
				</main>
			</body>
		</html>
	);
}
