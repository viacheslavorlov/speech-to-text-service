import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const client = new ApolloClient({
	uri: 'http://89.104.70.143:1337/graphql',
	cache: new InMemoryCache(),
  });
