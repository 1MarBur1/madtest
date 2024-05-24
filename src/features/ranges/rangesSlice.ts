import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { IRangeItem, ISetNewValue, RangesState } from './ranges.types'

const initialState: RangesState = {
  	ranges: [{
		"Name": "Item 1",
		"Percent": 100
	}, {
		"Name": "Item 2",
		"Percent": 0
	}, {
		"Name": "Item 3",
		"Percent": 0
	}]
}

interface ISortedValues {
	key: number,
	Percent: number
}

export const rangesSlice = createSlice({
	name: 'ranges',
	initialState,
	reducers: {
		setAllRanges: (state, action: PayloadAction<IRangeItem[]>) => {
			state.ranges = action.payload

			
			if (state.ranges.length > 1) {
				const percents = state.ranges.reduce((acc, item) => acc + item.Percent, 0)
				state.ranges[0].Percent += 100-percents
			}
		},
		setNewValue: (state, action: PayloadAction<ISetNewValue>) => {
			state.ranges[action.payload.rangeId].Percent = action.payload.newValue

			if (state.ranges.length > 1) {
				let percents = 0
	
				const sortedValues: ISortedValues[] = []
				
				state.ranges.forEach((value, key) => {
					percents += value.Percent
					if (key !== action.payload.rangeId) {	
						sortedValues.push({
							key: key,
							Percent: value.Percent
						})
					}
				})
	
				
				while (percents !== 100) {
					sortedValues.sort((a, b) => a.Percent - b.Percent)
					if (percents > 100) {
						const percentsForDecrease = Math.min(percents-100, state.ranges[sortedValues[sortedValues.length-1].key].Percent)
	
						state.ranges[sortedValues[sortedValues.length-1].key].Percent -= percentsForDecrease
						sortedValues[sortedValues.length-1].Percent -= percentsForDecrease
						percents -= percentsForDecrease
					} else if (percents < 100) {
						state.ranges[sortedValues[0].key].Percent += 100 - percents
						percents = 100
					}
				}
			}
		},
	},
})

export const { setNewValue, setAllRanges } = rangesSlice.actions
export const selectAllRanges = (state: RootState) => state.ranges.ranges;
export default rangesSlice.reducer