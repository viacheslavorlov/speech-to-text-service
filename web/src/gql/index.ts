import { gql } from '@apollo/client';

export const GET_NOTES = gql`
	query GetNotes($userId: ID!) {
		notes(filters: { user: { id: { eq: $userId } } }) {
			data {
				id
				attributes {
					content
					user {
						data {
							attributes {
								username
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_ONE_NOTE = gql`
	query GetOneNote($userId: ID!, $id: ID!) {
		notes(filters: { user: { id: { eq: $userId } }, id: {eq: $id} }) {
			data {
				id
				attributes {
					content
					createdAt
					user {
						data {
							attributes {
								username
							}
						}
					}
				}
			}
		}
	}
`;

export const CREATE_NOTE = gql`
	mutation CreateNote($note: String!, $user: ID!) {
		createNote(data: { content: $note, user: $user }) {
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

export const UPDATE_NOTE = gql`
	mutation UpdateNote($id: ID!, $content: String!) {
		updateNote(id: $id, data: { content: $content }) {
			data {
				id
				attributes {
					content
				}
			}
		}
	}
`;


export const GET_RULES = gql`
	query GetRules {
		rules {
			data {
				id
				attributes {
					substring
					symbol
				}
			}
		}
	}
`;
