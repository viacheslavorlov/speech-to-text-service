import { Collapse } from 'antd';

// const rules: CollapseProps['items'] = [
// 	{
// 		children: (
// 			<div>
// 				<p>Точка -- .</p>
// 			</div>
// 		),
// 		key: '1',
// 		label: 'Точка',
// 	},
// 	{
// 		children: (
// 			<div>
// 				<p>Запятая -- ,</p>
// 			</div>
// 		),
// 		key: '2',
// 		label: 'Запятая',
// 	},
// ];

export const Accordion = ({
	items,
}: {
	items?: { id: string; attributes: { symbol: string; substring: string } }[];
}) => {
	const onChange = (key: string | string[]) => {
		console.log(key);
	};

	return (
		<Collapse
			items={items?.map(item => ({
				
				children: `${item.attributes.substring} -- ${item.attributes.symbol}`
					
				,
				key: item.id,
				label: item.attributes.substring,
			}))}
			onChange={onChange}
		/>
	);
};
