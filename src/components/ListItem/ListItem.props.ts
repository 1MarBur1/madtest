import { IRangeItem } from "../../features/ranges/ranges.types"

interface Props extends IRangeItem {
	onChange: (newValue: number) => void
	readOnly?: boolean
}

export type {
	Props
}
