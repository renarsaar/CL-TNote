import { useState, createContext, FC, ReactElement } from 'react'
import { ActiveNoteTooltipState } from './types'

const contextDefaultValues: ActiveNoteTooltipState = {
  activeNoteId: null,
  setActiveNoteId: () => { },
  clearActiveNoteId: () => { }
}

export const ActiveNoteTooltipContext = createContext<ActiveNoteTooltipState>(
  contextDefaultValues
)

type ProviderProps = { children: ReactElement }

const ActiveNoteTooltipProvider: FC<ProviderProps> = ({ children }) => {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const clearActiveNoteId = () => setActiveNoteId(null)

  return (
    <ActiveNoteTooltipContext.Provider
      value={{
        activeNoteId,
        setActiveNoteId,
        clearActiveNoteId
      }}
    >
      {children}
    </ActiveNoteTooltipContext.Provider>
  )
}

export default ActiveNoteTooltipProvider