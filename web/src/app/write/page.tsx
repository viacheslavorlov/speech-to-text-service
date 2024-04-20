'use client';
import { client } from '#/apolo-client';
import type { Rule } from '#/app/types';
import { Textarea } from '#/components/shared/ui/Textarea';
import { Button } from '#/components/shared/ui/Button/Button';
import { Container } from '#/components/shared/ui/Container/Container';
import { Input } from '#/components/shared/ui/Input/Input';
import { LoadingSpinner } from '#/components/shared/ui/LoadingSpinner';
import { CREATE_NOTE, GET_RULES } from '#/gql';
import { useUser } from '#/lib/login/userStore';
import { replacer, sentenceModify } from '#/lib/textModifiers';
import { useRecogniserStore, useReplacements } from '#/store/recognizerStore';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client/react';
import { X } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { Accordion } from '../components/Accordion';
import { WriteComponentDynamic } from './components/WriteComponentDynamic';

if (process.env.NODE_ENV === 'development') {
	// Adds messages only in a dev environment

	loadDevMessages();

	loadErrorMessages();
}

export default function Home() {
	// const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
	const { id, jwt } = useUser();
	const { note, setNote, clearNote, title, setTitle } = useRecogniserStore(state => state);
	const { replacements } = useReplacements(state => state);

	const [createNote, {data: sendResult, loading:sendLoading,  error: sendError}] = useMutation(CREATE_NOTE, {
		context: {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		},
	});
	console.log(sendResult)

	const { data, loading, error } = useQuery(GET_RULES, {
		context: {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		},
	});

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value);
	};

	const handelSendNote = () => {
		console.log('1',sendLoading)
		createNote({ variables: { title: title || new Date().toLocaleString(), note, user: id } });
		console.log('2', sendLoading)
	};

	useLayoutEffect(() => {
		if (!id) {
			redirect('/forbidden');
		}
	}, [id]);
	if (loading) return <LoadingSpinner />;
	if (data && !loading) {
		return (
			<ApolloProvider client={client}>
				<Container>
					<WriteComponentDynamic
						setNote={setNote}
						// onClear={clearNote}
						sendNote={handelSendNote}
						note={note}
						disable={sendLoading}
					/>
					<h2 className='text-4xl font-bold'>Результат</h2>
					<div className='flex flex-col gap-2 relative'>
						<label htmlFor='title'>Название заметки: </label>
						<Input
							id='title'
							value={title}
							placeholder='Введите название заметки'
							onChange={e => setTitle(e.target.value)}
						/>
						<Button
							onClick={() => setTitle('')}
							variant='danger'
							rounded='l'
							padding='1'
							className='absolute bottom-3 right-2 z-30 h-8 w-8'>
							<X
								size={24}
								className='stroke-white'
							/>
						</Button>
					</div>
					<div className='flex flex-col gap-2 relative'>
						<label htmlFor='note'>Содержание заметки: </label>
						<Textarea
							id={'note'}
							value={note}
							chengable
							placeholder='say something'
							onChange={onChange}
						/>
						<Button
							rounded='l'
							padding='1'
							variant='danger'
							className='absolute bottom-3 right-2'
							onClick={() => setNote('')}>
							<X
								size={24}
								className=' stroke-white '
							/>
						</Button>
					</div>
					{data.rules.data.length && <Accordion items={data.rules.data} />}
					<div>
						<Button
							onClick={() => {
								setNote(
									sentenceModify(
										replacer(
											note,
											data.rules.data.map((rule: {attributes: Rule, }) => rule.attributes)
										)
									)
								);
							}}>
							Форматировать
						</Button>
						<Button
						//todo
						>
							Добавить правила
						</Button>
					</div>
				</Container>
			</ApolloProvider>
		);
	}
}
