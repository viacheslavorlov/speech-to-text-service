import dynamic from 'next/dynamic';

export const WriteComponentDynamic = dynamic(() => import('./WriteComponent'), {
  ssr: false, // Disable server-side rendering for this component
});