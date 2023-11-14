import { useState, createContext, FC, ReactElement } from 'react'
import { SearchState } from './types'

const contextDefaultValues: SearchState = {
  searchTerm: '',
  setSearchTerm: () => { }
}

export const SearchContext = createContext<SearchState>(
  contextDefaultValues
)

type ProviderProps = { children: ReactElement }

const SearchProvider: FC<ProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider