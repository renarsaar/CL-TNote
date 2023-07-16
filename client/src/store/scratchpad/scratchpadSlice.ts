import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { RootState } from '../store'
import { Scratchpad } from '../../interfaces/Scratchpad'

type ScratchpadState = Scratchpad

const initialState: ScratchpadState = {
  id: uuidv4(),
  text: '# Scratchpad\n\nThe easiest note to find.',
  created: moment().toISOString(true),
  lastUpdated: null
}

const scratchpadSlice = createSlice({
  name: 'scratchpad',
  initialState,
  reducers: {
    getScratchpad: () => {
      const scratchpad: string | null = localStorage.getItem('scratchpad')

      if (scratchpad === null) {
        const newScratchpad: Scratchpad = initialState

        localStorage.setItem('scratchpad', JSON.stringify(newScratchpad))

        return newScratchpad
      }

      const parsedScratchpad = JSON.parse(scratchpad)

      return parsedScratchpad
    },
    editScratchpad: (state: ScratchpadState, action: PayloadAction<{ value: string }>) => {
      const { value } = action.payload

      state.text = value
      state.lastUpdated = moment().toISOString(true)

      localStorage.setItem('scratchpad', JSON.stringify(state))
    }
  }
})

export const { getScratchpad, editScratchpad } = scratchpadSlice.actions
export const selectScratchpad = (state: RootState) => state.scratchpad
export default scratchpadSlice.reducer