import type { Rule } from '#/app/types';
import { Button } from '#/components/shared/ui/Button/Button';
import { Input } from '#/components/shared/ui/Input/Input';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';

type Props = {
	userId: string;
	jwt: string;
	disabled: boolean;
	createRule: (e: MouseEvent, obj: Rule) => void;
};

export const RuleCreation = ({ userId, jwt, disabled, createRule }: Props) => {
	const [substring, setSubstring] = useState('');
	const [symbol, setSymbol] = useState('');
	const onCreateRule = (e: MouseEvent) => {
		if (symbol && substring) {
			createRule(e, {
				substring: substring,
				symbol: symbol,
				user: userId,
			});
			setSubstring('');
			setSymbol('');
		}
	};

	return (
		<div className='flex flex-col space-y-4'>
			<h2  className='text-4xl font-bold'>Создать правило</h2>
			<form className='flex flex-col lg:flex-row items-center gap-4 lg:gap-6'>
				<Input
					value={substring}
					placeholder='то что нужно заменить'
					onChange={e => setSubstring(e.target.value)}		
				/>
				<ArrowRight className='hidden lg:block' />
				<ArrowDown className='lg:hidden' />
				<Input
					value={symbol}
					placeholder='на что заменить'
					onChange={e => setSymbol(e.target.value)}
				/>
				<Button
					disabled={disabled}//@ts-ignore
					onClick={e => onCreateRule(e)}
					type='submit'>
					Добавить правило
				</Button>
			</form>
		</div>
	);
};
