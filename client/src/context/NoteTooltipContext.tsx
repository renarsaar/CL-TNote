import { useState, createContext, FC, ReactElement } from 'react'
import { NoteTooltipState } from './types'

const contextDefaultValues: NoteTooltipState = {
  noteId: null,
  setNoteId: () => { },
  clearNoteId: () => { }
}

export const NoteTooltipContext = createContext<NoteTooltipState>(
  contextDefaultValues
)

type ProviderProps = { children: ReactElement }

const NoteTooltipProvider: FC<ProviderProps> = ({ children }) => {
  const [noteId, setNoteId] = useState<string | null>(null)
  const clearNoteId = () => setNoteId(null)

  return (
    <NoteTooltipContext.Provider
      value={{
        noteId,
        setNoteId,
        clearNoteId
      }}
    >
      {children}
    </NoteTooltipContext.Provider>
  )
}

export default NoteTooltipProvider