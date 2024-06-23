// utils/meilisearch.js
import { MeiliSearch } from 'meilisearch';

export const meilisearchClient = new MeiliSearch({
	host: 'http://localhost:7700',
	apiKey: '-8JQJrgf57f7n76wjhCpnkrwgRyNnnqpXEQ65DXFlqo', // Если вы используете защищенный ключ
});
