import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type TabTypes = 'scratchpad' | 'notes' | 'favorites' | 'trash'

type NavigationState = {
  tab: TabTypes
}

const initialState: NavigationState = {
  tab: 'notes'
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigation: (state: NavigationState, action: PayloadAction<TabTypes>) => {
      if (state.tab === action.payload) return

      state.tab = action.payload
    }
  }
})

export const { setNavigation } = navigationSlice.actions
export const selectNavigation = (state: RootState) => state.navigation
export default navigationSlice.reducer