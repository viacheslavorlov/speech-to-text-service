import { LoadingSpinner } from '#/components/shared/ui/LoadingSpinner';
import dynamic from 'next/dynamic';

export const WriteComponentDynamic = dynamic(() => import('./WriteComponent'), {
	loading: () => <LoadingSpinner />,
	ssr: false, // Disable server-side rendering for this component
});
