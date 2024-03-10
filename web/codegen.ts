import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	// schema: "https://olty.fun/backend/graphql",
	schema: 'http://localhost:1337/graphql',
	// schema: "https://euro-alliance.alexvyber.dev/backend/graphql",

	documents: ['src/**/*.(tsx|ts)', '!src/graphql/__generated__/**/*'],
	generates: {
		'./src/graphql/__generated__/': {
			preset: 'client',

			plugins: [
				// "typescript",
				// "typescript-operations",
				// "typescript-react-apollo",
			],
			config: {
				enumsAsTypes: true,
				scalars: { JSON: 'string', UUID: 'string', Date: 'string' },
			},
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
	},
};

export default config;
