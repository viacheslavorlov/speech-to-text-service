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


export const GET_ONE_NOTE = gql`
	query findOneNote ($id: ID!) {
		note (id: $id) {
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
		createNote(data: { content: $note }) {
			data {
				id
			}
		}
	}
`;

export const DELETE_NOTE = gql`
	mutation DeleteNote($id: ID!) {
		deleteNote(id: $id) {
			data {
				id
				attributes {
					content
				}
			}
		}
	}
`;
