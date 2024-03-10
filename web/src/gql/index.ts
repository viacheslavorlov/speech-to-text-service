import { gql } from '@apollo/client';



export const GET_NOTES = gql`
	query GetNotes($userId: ID!) {
		notes(filters: { user: { id: { eq: $userId } } }) {
			data {
				id
				attributes {
					content
					title
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
		notes(filters: { user: { id: { eq: $userId } }, id: { eq: $id } }) {
			data {
				id
				attributes {
					title
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
	mutation CreateNote($title: String!, $note: String!, $user: ID!) {
		createNote(data: { content: $note, user: $user, title: $title }) {
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
					title
				}
			}
		}
	}
`;

export const UPDATE_NOTE = gql`
	mutation UpdateNote($id: ID!, $content: String!, $title: String!) {
		updateNote(id: $id, data: { content: $content, title: $title }) {
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

export const GET_NOTES_PAGE_DATA = gql`
	query GetNotesPageData {
		notesListPageData {
			data {
				attributes {
					title
					detailsButton
					deleteButton
				
				}
			}
		}
	}
`;