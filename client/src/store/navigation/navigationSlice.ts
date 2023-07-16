import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type NavigationState = {
  scratchpad: boolean,
  notes: boolean,
  favorites: boolean,
  trash: boolean
}

const initialState: NavigationState = {
  scratchpad: false,
  notes: true,
  favorites: false,
  trash: false
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigation: (state: NavigationState, action: PayloadAction<{ name: string, value: boolean }>) => {
      const { name, value } = action.payload

      Object.keys(state)
        .forEach(tab => state[tab as keyof NavigationState] = false)

      state[name as keyof NavigationState] = value
    }
  }
})

export const { setNavigation } = navigationSlice.actions
export const selectNavigation = (state: RootState) => state.navigation
export default navigationSlice.reducer