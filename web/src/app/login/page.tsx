'use client';
import { Container } from '#/components/shared/ui/Container/Container';
import { LoadingSpinner } from '#/components/shared/ui/LoadingSpinner';
import { loginUser } from '#/lib/login/login';
import { registerUser } from '#/lib/login/register';
import { useUser } from '#/lib/login/userStore';
import Link from 'next/link';
import { Suspense, SyntheticEvent, useState } from 'react';
import { Button } from '../../components/shared/ui/Button/Button';

export default function Login() {
	const { username, jwt, setId, setJwt, setUsername, setUserEmail } = useUser();
	const [formData, setFormData] = useState({ identifier: '', password: '' });
	const [registerData, setRegisterData] = useState({ email: '', username: '', password: '' });
	const [login, setLogin] = useState(true);
	const [error, setError] = useState('');

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault(); // Prevent the default form submission behavior
		if (!formData.identifier || !formData.password) {
			setError('Заполните все поля формы');
			return;
		}
		try {
			const response = await loginUser(formData);
			console.log(response);
			if (response?.data?.jwt) {
				setJwt(response.data.jwt);
				setUsername(response.data.user.username);
				setUserEmail(response.data.user.email);
				setId(response.data.user.id);
				// @ts-ignore
			} else if (response?.response?.data?.error?.message) {
				// @ts-ignore
				setError(response?.response?.data?.error?.message);
			}
			// Handle the response and update the state or perform any other actions
		} catch (error) {
			console.log(error);
			// Handle any errors that occur during the form submission
		}
	};

	const handleRegister = async (e: SyntheticEvent) => {
		e.preventDefault(); // Prevent the default form submission behavior
		if (!registerData.email || !registerData.password || !registerData.username) {
			setError('Заполните все поля формы');
			return;
		}
		try {
			const response = await registerUser(registerData);
			console.log('front response', response);
			if (response?.jwt) {
				setId(response.user.id);
				setJwt(response.jwt);
				setUsername(response?.user?.username);
				setUserEmail(response?.user?.email);
				// @ts-ignore
			} else if (response?.data?.error?.message) {
				// @ts-ignore
				setError(response?.data?.error?.message);
			}
			// Handle the response and update the state or perform any other actions
		} catch (error) {
			console.log(error);
			// Handle any errors that occur during the form submission
		}
	};

	if (username && jwt) {
		return (
			<Container className=''>
				<h1 className='text-2xl text-center'>Вы авторизованы</h1>
				<Link
					href={'/'}
					className='text-xl bg-green-600 p-4 text-center rounded-md'>
					{' '}
					На главную
				</Link>
				<Link
					href={'/write'}
					className='text-xl bg-green-600 p-4 text-center rounded-md'>
					Начать записывать
				</Link>
			</Container>
		);
	}

	return (
		<Suspense
			unstable_expectedLoadTime={1500}
			fallback={<LoadingSpinner />}>
			<Container>
				{login ? (
					<form
						className='bg-slate-600 rounded-xl p-6 flex flex-col gap-2 justify-center items-center'
						onSubmit={handleSubmit}>
						<h1 className='text-2xl text-center'>Вход</h1>
						<input
							className='p-2 rounded-md text-black'
							type='text'
							name='identifier'
							placeholder='email или имя пользователя'
							value={formData.identifier}
							onChange={e => setFormData({ ...formData, identifier: e.target.value })}
						/>
						<input
							className='p-2 rounded-md text-black'
							type='password'
							name='password'
							placeholder='пароль'
							value={formData.password}
							onChange={e => setFormData({ ...formData, password: e.target.value })}
						/>
						<Button type='submit'>Войти</Button>
						<Button onClick={() => setLogin(false)}>Перейти к регистрации</Button>
						{error && <p className='text-red-700'>{error}</p>}
					</form>
				) : (
					<form
						className='bg-slate-600 rounded-xl p-6 flex flex-col gap-2 justify-center items-center'
						onSubmit={handleRegister}>
						<h1 className='text-2xl text-center'>Регистрация</h1>
						<input
							className='p-2 rounded-md text-black'
							type='text'
							name='email'
							placeholder='email'
							value={registerData.email}
							onChange={e =>
								setRegisterData({ ...registerData, email: e.target.value })
							}
						/>
						<input
							className='p-2 rounded-md text-black'
							type='text'
							name='username'
							placeholder='имя пользователя'
							value={registerData.username}
							onChange={e =>
								setRegisterData({ ...registerData, username: e.target.value })
							}
						/>
						<input
							className='p-2 rounded-md text-black'
							type='password'
							name='password'
							placeholder='пароль'
							value={registerData.password}
							onChange={e =>
								setRegisterData({ ...registerData, password: e.target.value })
							}
						/>
						<Button onClick={() => setLogin(true)}>Войти</Button>
						<Button type='submit'>Зарегистрироваться</Button>
						{error && <p className='text-red-700'>{error}</p>}
					</form>
				)}
			</Container>
		</Suspense>
	);
}
