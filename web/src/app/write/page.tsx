'use client';
import { client } from '#/apolo-client';
import type { Rule } from '#/app/types';
import { Button } from '#/components/shared/ui/Button/Button';
import { Container } from '#/components/shared/ui/Container/Container';
import { Input } from '#/components/shared/ui/Input/Input';
import { LoadingSpinner } from '#/components/shared/ui/LoadingSpinner';
import { Textarea } from '#/components/shared/ui/Textarea';
import { RuleCreation } from '#/components/widgets/RuleCreation/RuleCreator';
import { CREATE_NOTE, CREATE_RULE, GET_RULES } from '#/gql';
import { useUser } from '#/lib/login/userStore';
import { replacer, sentenceModify } from '#/lib/textModifiers';
import { useRecogniserStore, useReplacements } from '#/store/recognizerStore';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client/react';
import { X } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { Accordion } from '../components/Accordion';
import { WriteComponentDynamic } from './components/WriteComponentDynamic';

export default function Home() {
	// const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
	const { id, jwt } = useUser();
	const { note, setNote, clearNote, title, setTitle } = useRecogniserStore(state => state);
	const { replacements } = useReplacements(state => state);

	const [createNote, { data: sendResult, loading: sendLoading, error: sendError }] = useMutation(
		CREATE_NOTE,
		{
			context: {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			},
		}
	);
	console.log(sendResult);

	const {
		data,
		loading,
		error,
		refetch: rulesRefetch,
	} = useQuery(GET_RULES, {
		variables: {userId: id},
		context: {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		},
	});
	const [createRule, { loading: ruleLoading, error: ruleError }] = useMutation(CREATE_RULE, {
		context: {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		},
	});
	const onCreateRule = (e: MouseEvent, obj: Rule) => {
		e.preventDefault();
		createRule({ variables: obj });
		rulesRefetch();
	};

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNote(e.target.value);
	};

	const handelSendNote = () => {
		console.log('1', sendLoading);
		createNote({ variables: { title: title || new Date().toLocaleString(), note, user: id } });
		console.log('2', sendLoading);
		setNote('');
		setTitle('');
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
				<Container className='space-y-4 lg:space-y-6'>
					<WriteComponentDynamic
						setNote={setNote}
						// onClear={clearNote}
						sendNote={handelSendNote}
						note={note}
						disable={sendLoading}
					/>
					{/* <h2 className='text-4xl font-bold'>Результат</h2> */}
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
							placeholder='нажмите на "Запись" и скажите то что хотите записать'
							onChange={onChange}
						/>
						<Button
							rounded='l'
							padding='1'
							variant='danger'
							className='absolute bottom-3 right-2  h-8 w-8'
							onClick={() => setNote('')}>
							<X
								size={24}
								className=' stroke-white '
							/>
						</Button>
					</div>
					<Button
							onClick={() => {
								setNote(
									sentenceModify(
										replacer(
											note,
											data.rules.data.map(
												(rule: { attributes: Rule }) => rule.attributes
											)
										)
									)
								);
							}}>
							Форматировать
						</Button>
					{data.rules.data.length > 0 && <Accordion items={data.rules.data} />}
					<div>
						
						<RuleCreation
							disabled={ruleLoading}
							createRule={onCreateRule}
							userId={id.toString()}
							jwt={jwt}
						/>
					</div>
				</Container>
			</ApolloProvider>
		);
	}
}
