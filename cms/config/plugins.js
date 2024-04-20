
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
			host: "http://localhost:7700",
			// Your master key or private key
			apiKey: "-8JQJrgf57f7n76wjhCpnkrwgRyNnnqpXEQ65DXFlqo",
		},
	},
});
