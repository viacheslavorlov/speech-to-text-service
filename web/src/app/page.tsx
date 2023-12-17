import { Container } from '#/components/shared/ui/Container/Container';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
export default function Home() {
	const {userId} = auth()
	if(userId) {
		redirect('/notes')
	}
	return (
		<Container>
			<h1 className='w-full'>На этом сайте вы можете делать записи своего голоса модифицировать и сохранять в базе данных</h1>
		</Container>
	)
}