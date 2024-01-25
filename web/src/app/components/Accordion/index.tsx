import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const rules: CollapseProps['items'] = [
	{
		children: (
			<div>
				<p>Точка -- .</p>
			</div>
		),
		key: '1',
		label: 'Точка',
	},
	{
		children: (
			<div>
				<p>Запятая -- ,</p>
			</div>
		),
		key: '2',
		label: 'Запятая',
	},
];

export const Accordion = (items?: CollapseProps['items']) => {
	const onChange = (key: string | string[]) => {
		console.log(key);
	};

	return (
		<Collapse
			// className='h-[200px]'
			items={rules}
			// defaultActiveKey={['1']}
			onChange={onChange}
		/>
	);
};
