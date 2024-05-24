import React from 'react';
import { Props } from './ListItem.props';

const ListItem: React.FC<Props> = ({ Name, Percent, onChange=()=>null, readOnly=false }) => {
	return (
		<div className='flex gap-3'>
			<h1>
				{Name}:
			</h1>

			{!readOnly && (
				<input 
					type='range' 
					min={0}
					max={100} 
					value={Percent}
					onChange={(e) => onChange(Number(e.target.value))} />
			)}

			{!readOnly ? (
				<input 
					type='number' 
					min={0}
					max={100} 
					value={Percent}
					onChange={(e) => onChange(Number(e.target.value))} />
			) : (
				<h1>
					{Percent}%
				</h1>
			)}
			
		</div>
	);
};

export default ListItem;