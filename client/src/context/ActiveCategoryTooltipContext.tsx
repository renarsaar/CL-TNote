import { useState, createContext, FC, ReactElement } from 'react'
import { ActiveCategoryTooltipState } from './types'

const contextDefaultValues: ActiveCategoryTooltipState = {
  activeCategoryId: null,
  setActiveCategoryId: () => { },
  clearActiveCategoryId: () => { }
}

export const ActiveCategoryTooltipContext = createContext<ActiveCategoryTooltipState>(
  contextDefaultValues
)

type ProviderProps = { children: ReactElement }

const ActiveCategoryTooltipProvider: FC<ProviderProps> = ({ children }) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const clearActiveCategoryId = () => setActiveCategoryId(null)

  return (
    <ActiveCategoryTooltipContext.Provider
      value={{
        activeCategoryId,
        setActiveCategoryId,
        clearActiveCategoryId
      }}
    >
      {children}
    </ActiveCategoryTooltipContext.Provider>
  )
}

export default ActiveCategoryTooltipProvider