import { useState, createContext, FC, ReactElement } from 'react'
import { RenameCategoryState } from './types'

const contextDefaultValues: RenameCategoryState = {
  formId: null,
  setFormId: () => { },
  clearFormId: () => { }
}

export const RenameCategoryContext = createContext<RenameCategoryState>(
  contextDefaultValues
)

type ProviderProps = { children: ReactElement }

const RenameCategoryProvider: FC<ProviderProps> = ({ children }) => {
  const [formId, setFormId] = useState<string | null>(null)
  const clearFormId = () => setFormId(() => null)

  return (
    <RenameCategoryContext.Provider value={{
      formId,
      setFormId,
      clearFormId
    }}>
      {children}
    </RenameCategoryContext.Provider>
  )
}

export default RenameCategoryProvider