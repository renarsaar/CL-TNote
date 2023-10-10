import { useState, createContext, FC, ReactElement } from 'react'
import { ActiveCategoryFormState } from './types'

const contextDefaultValues: ActiveCategoryFormState = {
  activeCategoryFormId: null,
  setActiveCategoryFormId: () => { },
  clearActiveCategoryFormId: () => { }
}

export const ActiveCategoryRenameFormContext = createContext<ActiveCategoryFormState>(
  contextDefaultValues
)

type ProviderProps = { children: ReactElement }

const ActiveCategoryRenameFormProvider: FC<ProviderProps> = ({ children }) => {
  const [activeCategoryFormId, setActiveCategoryFormId] = useState<string | null>(null)
  const clearActiveCategoryFormId = () => setActiveCategoryFormId(() => null)

  return (
    <ActiveCategoryRenameFormContext.Provider value={{
      activeCategoryFormId,
      setActiveCategoryFormId,
      clearActiveCategoryFormId
    }}>
      {children}
    </ActiveCategoryRenameFormContext.Provider>
  )
}

export default ActiveCategoryRenameFormProvider