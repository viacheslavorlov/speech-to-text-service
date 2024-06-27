// utils/meilisearch.js
import { MeiliSearch } from 'meilisearch';

export const meilisearchClient = new MeiliSearch({
	host: 'https://milisearch.speech-totext.ru',
	apiKey: '-8JQJrgf57f7n76wjhCpnkrwgRyNnnqpXEQ65DXFlqo', // Если вы используете защищенный ключ
});
