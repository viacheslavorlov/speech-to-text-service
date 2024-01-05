import { LoadingSpinner } from '#/components/shared/ui/LoadingSpinner';
import dynamic from 'next/dynamic';
export const NotesListDynamic = dynamic(() => import('./NotesList'), {
	ssr: true,
	loading: () => <LoadingSpinner />,
});
