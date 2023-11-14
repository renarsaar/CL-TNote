import { ReactElement, JSXElementConstructor } from 'react'
import ConfigsProvider from '../context/ConfigContext'
import ResizerProvider from '../context/ResizerContext'
import NoteTooltipProvider from '../context/NoteTooltipContext'
import CategoryTooltipProvider from '../context/CategoryTooltipContext'
import RenameCategoryProvider from '../context/RenameCategoryContext'
import SearchProvider from '../context/SearchContext'

type Props = {
  children: ReactElement<any, string | JSXElementConstructor<any>>
}

const AppProviders = ({ children }: Props) => {
  return (
    <ConfigsProvider>
      <ResizerProvider>
        <NoteTooltipProvider>
          <CategoryTooltipProvider>
            <RenameCategoryProvider>
              <SearchProvider>
                {children}
              </SearchProvider>
            </RenameCategoryProvider>
          </CategoryTooltipProvider>
        </NoteTooltipProvider>
      </ResizerProvider>
    </ConfigsProvider>
  )
}

export default AppProviders;