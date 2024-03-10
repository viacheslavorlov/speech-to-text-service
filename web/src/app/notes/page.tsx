import { Container } from '#/components/shared/ui/Container/Container';
import { NotesListDynamic } from '#/components/widgets/NotesList/NotesListDynamic';
import type { NotesListPageDataEntityResponse } from '#/graphql/__generated__/graphql';
import { useUser } from '#/lib/login/userStore';
import axios from 'axios';
import { redirect } from 'next/navigation';


export default async function Notes() {
	return (
		<Container>
			<NotesListDynamic
				// deleteButton={pageData?.deleteButton}
				// detaisButton={pageData?.detailsButton}
			/>
		</Container>
	);
}
