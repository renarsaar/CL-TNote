import { useState, createContext, FC, ReactElement } from 'react'
import { CategoryTooltipState } from './types'

const contextDefaultValues: CategoryTooltipState = {
  categoryId: null,
  setCategoryId: () => { },
  clearCategoryId: () => { }
}

export const CategoryTooltipContext = createContext<CategoryTooltipState>(
  contextDefaultValues
)

type ProviderProps = { children: ReactElement }

const CategoryTooltipProvider: FC<ProviderProps> = ({ children }) => {
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const clearCategoryId = () => setCategoryId(null)

  return (
    <CategoryTooltipContext.Provider
      value={{
        categoryId,
        setCategoryId,
        clearCategoryId
      }}
    >
      {children}
    </CategoryTooltipContext.Provider>
  )
}

export default CategoryTooltipProvider