import { useContext } from 'react'
import { selectNavigation } from '../../store/navigation/navigationSlice'
import { ConfigContext, ResizerContext } from '../../context'
import { useAppSelector } from '../../hooks/hooks'
import NoteSidebarHeader from './NoteSidebarHeader'
import NoteList from '../../components/NoteList'
import Resizer from '../../components/Reziser'
import { ConfigContextState } from '../../context/types'
import './style.scss'

export default function NoteSideBar() {
  const { noteSideBarWidth } = useContext(ResizerContext)
  const { configs: { theme } } = useContext<ConfigContextState>(ConfigContext)
  const { tab } = useAppSelector(selectNavigation)

  return tab !== 'scratchpad' ? (
    <>
      <div
        className={theme === 'light' ? 'note-sidebar-container' : 'note-sidebar-container dark-mode'}
        style={{ width: noteSideBarWidth }}
      >
        <aside className={theme === 'light' ? 'note-sidebar' : 'note-sidebar-dark'}>
          <NoteSidebarHeader />
          <NoteList />
        </aside>
      </div>

      <Resizer component='NoteSideBar' />
    </>
  ) : null
}