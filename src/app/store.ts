import { configureStore } from '@reduxjs/toolkit'
import rangesSlice from '../features/ranges/rangesSlice'

export const store = configureStore({
  reducer: {
    ranges: rangesSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch