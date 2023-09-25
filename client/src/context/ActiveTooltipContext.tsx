import { useState, createContext, FC, ReactElement } from 'react'
import { ActiveTooltipState } from './types'

const contextDefaultValues: ActiveTooltipState = {
  activeNoteId: null,
  setActiveNoteId: () => { },
  clearActiveNoteId: () => { }
}

export const ActiveTooltipContext = createContext<ActiveTooltipState>(
  contextDefaultValues
)

type ProviderProps = { children: ReactElement }

const ActiveTooltipProvider: FC<ProviderProps> = ({ children }) => {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const clearActiveNoteId = () => setActiveNoteId(null)

  return (
    <ActiveTooltipContext.Provider
      value={{
        activeNoteId,
        setActiveNoteId,
        clearActiveNoteId
      }}
    >
      {children}
    </ActiveTooltipContext.Provider>
  )
}

export default ActiveTooltipProvider