// utils/meilisearch.js
import { MeiliSearch } from 'meilisearch';

export const meilisearchClient = new MeiliSearch({
	host: process.env.NEXT_PUBLIC_MILISEARCH_HOST!,
	apiKey: process.env.NEXT_PUBLIC_MILISEARCH_API_KEY!, // Если вы используете защищенный ключ
});
