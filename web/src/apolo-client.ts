import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const client = new ApolloClient({
	uri: 'http://localhost:1337/graphql',
	cache: new InMemoryCache(),
  });

//   client
//   .query({
//     query: gql`
//       query GetNotes {
//         notes {
// 			data {
// 				id
// 				attributes{
// 					content
// 					createdAt
// 				}
// 			}
          
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));