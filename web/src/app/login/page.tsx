'use client';
import { LoadingSpinner } from '#/components/shared/LoadingSpinner';
import { Container } from '#/components/shared/ui/Container/Container';
import { useUser } from '@clerk/nextjs';
import { Suspense } from 'react';

export default function Login() {
	const { user, isLoaded } = useUser();
	return (
		<Suspense>
			<Container>
				{isLoaded && user ? (
					<h1 className='text-2xl text-center'>Вы авторизованы</h1>
				) : (
					<>
						<h1 className='text-2xl text-center'>Идёт загрузка ...</h1>
						<LoadingSpinner />
					</>
				)}
			</Container>
		</Suspense>
	);
}
