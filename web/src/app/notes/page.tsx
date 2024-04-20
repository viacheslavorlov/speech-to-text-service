import { Container } from '#/components/shared/ui/Container/Container';
import { NotesListDynamic } from '#/components/widgets/NotesList/NotesListDynamic';
import { Search } from '#/components/widgets/Search';


export default async function Notes() {
	return (
		<Container>
			<Search/>
			<NotesListDynamic
				// deleteButton={pageData?.deleteButton}
				// detaisButton={pageData?.detailsButton}
			/>
		</Container>
	);
}
