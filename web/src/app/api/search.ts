import { MeiliSearch } from 'meilisearch';
(async () => {
	const client = new MeiliSearch({
		host: 'http://127.0.0.1:7700',
		apiKey: 'publicKey', // Use the public key not the private or master key to search.
	});

	// An index is where the documents are stored.
	const response = client.index('movies').search('Biscoutte');
})();
