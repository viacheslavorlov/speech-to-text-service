'use client';
import { client } from '#/apolo-client';
import { Textarea } from '#/components/shared/Textarea';
import { Button } from '#/components/shared/ui/Button/Button';
import { Container } from '#/components/shared/ui/Container/Container';
import { CREATE_NOTE, GET_RULES } from '#/gql';
import { useUser } from '#/lib/login/userStore';
import { replacer, sentenceModify } from '#/lib/textModifiers';
import { useRecogniserStore, useReplacements } from '#/store/recognizerStore';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client/react';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { Accordion } from '../components/Accordion';
import { WriteComponentDynamic } from './components/WriteComponentDynamic';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { LoadingSpinner } from '#/components/shared/ui/LoadingSpinner';

if (process.env.NODE_ENV === 'development') {
	// Adds messages only in a dev environment

	loadDevMessages();

	loadErrorMessages();
}

export default function Home() {
	// const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
	const { id, jwt } = useUser();

	const { note, setNote, clearNote } = useRecogniserStore(state => state);
	const { replacements } = useReplacements(state => state);

	const [creatNote] = useMutation(CREATE_NOTE, {
		context: {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		},
	});

	const { data, loading, error } = useQuery(GET_RULES, {
		context: {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		},
	});

	const onCahge = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value);
	};

	const handelSendNote = () => {
		creatNote({ variables: { note, user: id } });
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
						onClear={clearNote}
						note={note}
					/>
					<h2 className='text-4xl font-bold'>Результат</h2>
					<Textarea
						value={note}
						chengable
						placeholder='say something'
						onChange={onCahge}
					/>
					{data.rules.data.length && <Accordion items={data.rules.data} />}
					<div>
						<Button
							onClick={() => {
								console.log('работает');
								setNote(sentenceModify(replacer(note, data.rules.data.map(rule => rule.attributes))));
							}}>
							Форматировать
						</Button>
						<Button
						//todo
						>
							Добавить правила
						</Button>
					</div>
					<Button
						variant='secondary'
						onClick={handelSendNote}>
						Отправить в БД
					</Button>
				</Container>
			</ApolloProvider>
		);
	}
}
