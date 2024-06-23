import { Collapse } from 'antd';

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
				children: `${item.attributes.substring} --> ${item.attributes.symbol}`,

				key: item.id,
				label: item.attributes.substring,
			}))}
			onChange={onChange}
		/>
	);
};
