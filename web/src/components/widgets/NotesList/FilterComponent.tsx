import React from 'react';
import { Filter } from '#/app/types';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface FilterComponentProps {
	filter: Filter;
	setFilter: (filter: Filter) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ filter, setFilter }) => {
	const handleFilterChange = (e: any) => {
		const filterName = e.target.dataset.name as Filter;

		if (filter === filterName) {
			setFilter((filterName + '-reverse') as Filter);
		} else if (filter === filterName + '-reverse') {
			setFilter(filterName);
		} else {
			setFilter(filterName);
		}
	};

	return (
		<div className='hidden lg:flex items-center lg:gap-6 border-b w-full'>
			<div className='shrink-0 w-8 hidden lg:block'></div>
			<button
				className='shrink-0 lg:w-24 flex gap-1 cursor-pointer'
				data-name='id'
				onClick={handleFilterChange}>
				Номер{' '}
				<ChevronDown
					data-name='id'
					className={clsx(
						filter.includes('reverse') && filter.includes('id') ? 'rotate-180' : '',
						' transition-all'
					)}
				/>
			</button>
			<button
				className='shrink-0 lg:w-24 flex gap-1 cursor-pointer'
				data-name='date'
				onClick={handleFilterChange}>
				Дата{' '}
				<ChevronDown
					data-name='date'
					className={clsx(
						filter.includes('reverse') && filter.includes('date') ? 'rotate-180' : '',
						' transition-all'
					)}
				/>
			</button>
			<button
				className='shrink-0 lg:w-48 flex gap-1 cursor-pointer'
				data-name='title'
				onClick={handleFilterChange}>
				Название{' '}
				<ChevronDown
					data-name='title'
					className={clsx(
						filter.includes('reverse') && filter.includes('title') ? 'rotate-180' : '',
						' transition-all'
					)}
				/>
			</button>
			<button
				className='flex gap-1 cursor-pointer'
				data-name='content'
				onClick={handleFilterChange}>
				Заметка{' '}
				<ChevronDown
					data-name='content'
					className={clsx(
						filter.includes('reverse') && filter.includes('content')
							? 'rotate-180'
							: '',
						' transition-all'
					)}
				/>
			</button>
		</div>
	);
};

export default FilterComponent;
