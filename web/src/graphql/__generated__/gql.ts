/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tquery GetNotes($userId: ID!) {\n\t\tnotes(filters: { user: { id: { eq: $userId } } }) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tcontent\n\t\t\t\t\ttitle\n\t\t\t\t\tuser {\n\t\t\t\t\t\tdata {\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetNotesDocument,
    "\n\tquery GetOneNote($userId: ID!, $id: ID!) {\n\t\tnotes(filters: { user: { id: { eq: $userId } }, id: { eq: $id } }) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tcontent\n\t\t\t\t\tcreatedAt\n\t\t\t\t\tuser {\n\t\t\t\t\t\tdata {\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetOneNoteDocument,
    "\n\tmutation CreateNote($title: String!, $note: String!, $user: ID!) {\n\t\tcreateNote(data: { content: $note, user: $user, title: $title }) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": types.CreateNoteDocument,
    "\n\tmutation DeleteNote($id: ID!) {\n\t\tdeleteNote(id: $id) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.DeleteNoteDocument,
    "\n\tmutation UpdateNote($id: ID!, $content: String!, $title: String!) {\n\t\tupdateNote(id: $id, data: { content: $content, title: $title }) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tcontent\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.UpdateNoteDocument,
    "\n\tquery GetRules {\n\t\trules {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tsubstring\n\t\t\t\t\tsymbol\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetRulesDocument,
    "\n\tquery GetNotesPageData {\n\t\tnotesListPageData {\n\t\t\tdata {\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tdetailsButton\n\t\t\t\t\tdeleteButton\n\t\t\t\t\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetNotesPageDataDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetNotes($userId: ID!) {\n\t\tnotes(filters: { user: { id: { eq: $userId } } }) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tcontent\n\t\t\t\t\ttitle\n\t\t\t\t\tuser {\n\t\t\t\t\t\tdata {\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetNotes($userId: ID!) {\n\t\tnotes(filters: { user: { id: { eq: $userId } } }) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tcontent\n\t\t\t\t\ttitle\n\t\t\t\t\tuser {\n\t\t\t\t\t\tdata {\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetOneNote($userId: ID!, $id: ID!) {\n\t\tnotes(filters: { user: { id: { eq: $userId } }, id: { eq: $id } }) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tcontent\n\t\t\t\t\tcreatedAt\n\t\t\t\t\tuser {\n\t\t\t\t\t\tdata {\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetOneNote($userId: ID!, $id: ID!) {\n\t\tnotes(filters: { user: { id: { eq: $userId } }, id: { eq: $id } }) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tcontent\n\t\t\t\t\tcreatedAt\n\t\t\t\t\tuser {\n\t\t\t\t\t\tdata {\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateNote($title: String!, $note: String!, $user: ID!) {\n\t\tcreateNote(data: { content: $note, user: $user, title: $title }) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateNote($title: String!, $note: String!, $user: ID!) {\n\t\tcreateNote(data: { content: $note, user: $user, title: $title }) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation DeleteNote($id: ID!) {\n\t\tdeleteNote(id: $id) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeleteNote($id: ID!) {\n\t\tdeleteNote(id: $id) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UpdateNote($id: ID!, $content: String!, $title: String!) {\n\t\tupdateNote(id: $id, data: { content: $content, title: $title }) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tcontent\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateNote($id: ID!, $content: String!, $title: String!) {\n\t\tupdateNote(id: $id, data: { content: $content, title: $title }) {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tcontent\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetRules {\n\t\trules {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tsubstring\n\t\t\t\t\tsymbol\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetRules {\n\t\trules {\n\t\t\tdata {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tsubstring\n\t\t\t\t\tsymbol\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetNotesPageData {\n\t\tnotesListPageData {\n\t\t\tdata {\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tdetailsButton\n\t\t\t\t\tdeleteButton\n\t\t\t\t\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetNotesPageData {\n\t\tnotesListPageData {\n\t\t\tdata {\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tdetailsButton\n\t\t\t\t\tdeleteButton\n\t\t\t\t\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;