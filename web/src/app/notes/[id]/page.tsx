// 'use client'
import { GET_NOTES, GET_ONE_NOTE } from "#/gql";
import { useQuery } from "@apollo/client";
import { request } from "graphql-request";
import { useParams, usePathname } from "next/navigation";
import { ParsedUrlQuery } from "querystring";


export const generateStaticParams= async () => {
	const data = await request('http://localhost:1337/graphql', GET_NOTES)
	console.log(data);
	console.log('paths are works');
	console.log(data.notes.data.map(note => {
		return {
			params: {
				id: note.id
			}
		}
	}));
	
	return  data.notes.data.map(note => {
			return {
				params: {
					id: note.id
				}
			}
		})
}


const getNote = async (id: string) => {
	console.log(id);
	const data = await request('http://localhost:1337/graphql', GET_ONE_NOTE, {id: id})
	console.log('note ', data);
	console.log('props are works');
	
	return {
		
			note: data?.note?.data
		}
	}



export default async function NoteSLug({params}) {

	// const {id} = useParams()
	const {note} = await getNote(params.id)
	console.log('component', note);
	

	return (
		<>
		<h1>Заметка № {note.id}</h1> 
		 <div>{new Date(note.attributes.createdAt).toLocaleString()}</div>
		<div>
			{note.attributes.content}
		</div>
		<button>Удалить</button>
		<button>Редактировать</button>
		<button>Сохранить</button>

		</>
	)
}
