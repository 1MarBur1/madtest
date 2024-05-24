interface IRangeItem {
	Name: string,
	Percent: number
}

interface RangesState {
	ranges: IRangeItem[]
}

interface ISetNewValue {
	rangeId: number,
	newValue: number
}

export type {
	RangesState,
	IRangeItem,
	ISetNewValue
}