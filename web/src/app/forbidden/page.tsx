import { Button } from '#/components/shared/ui/Button/Button';
import { Container } from '#/components/shared/ui/Container/Container';
import Link from 'next/link';

export default function ForbiddenPage() {
	return (
		<Container className='text-white text-center flex flex-col justify-center items-center'>
			<h1 className='text-2xl'>
				Данный контент предназначен только для авторизованных пользователей
			</h1>
			<Link href={'/'}>
				<Button variant='ghost'>На главную</Button>
			</Link>
			<Link href={'/login'}>
				<Button variant='ghost'>Авторизоваться</Button>
			</Link>
		</Container>
	);
}
