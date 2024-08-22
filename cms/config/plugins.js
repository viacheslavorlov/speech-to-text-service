
module.exports = ({ env }) => ({
	"users-permissions": {
		config: {
			jwt: {
				expiresIn: "7d",
			},
		},
	},
	meilisearch: {
		config: {
			// Your meili host
			host: env("MILISEARCH_HOST"),
			// Your master key or private key
			apiKey: env("MILISEARCH_MASTER_KEY"),
		},
	},
});
