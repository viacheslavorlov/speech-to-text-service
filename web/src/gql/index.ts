import { gql } from '@apollo/client';

export const GET_NOTES = gql`
	query getNotes {
		notes {
			data {
				id
				attributes {
					content
					createdAt
				}
			}
		}
	}
`;

export const CREATE_NOTE = gql`
	mutation CreateNote($note: String!) {
		createNote(data: {content: $note}) {
			data {
				id

			}
		}
	}
`;
