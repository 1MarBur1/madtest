import React, { useEffect } from 'react';
import ListItem from './components/ListItem';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectAllRanges, setAllRanges, setNewValue } from './features/ranges/rangesSlice';

const mocks = [{
	"Name": "Item 1",
	"Percent": 50
}, {
	"Name": "Item 2",
	"Percent": 20
}, {
	"Name": "Item 3",
	"Percent": 0
}]

const MainPage = () => {
	const data = useAppSelector(selectAllRanges)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(setAllRanges(mocks))
	}, [])
	
	return (
		<div className="p-16">
			{data.map((item, key) => (
				<ListItem 
					{...item}
					key={`${key}_${item.Name}`}
					onChange={(value) => dispatch(setNewValue({
						newValue: value,
						rangeId: key
					}))} />
			))}
			<h1 className='font-bold'>
				Результат:
			</h1>

			{data.map((item, key) => (
				<ListItem 
					{...item}
					readOnly
					key={`view_${key}_${item.Name}`}
					onChange={(value) => dispatch(setNewValue({
						newValue: value,
						rangeId: key
					}))} />
			))}
		</div>
	);
}

export default MainPage;
