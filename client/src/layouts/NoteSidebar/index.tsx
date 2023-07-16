import { useContext } from 'react'

import NoteSidebarHeader from './NoteSidebarHeader'
import NoteList from '../../components/NoteList'
import Resizer from '../../components/Reziser'
import { ResizerContext } from '../../context'
import './style.scss'
import { useAppSelector } from '../../hooks/hooks'
import { selectNavigation } from '../../store/navigation/navigationSlice'

export default function NoteSideBar() {
  const { noteSideBarWidth } = useContext(ResizerContext)
  const tab = useAppSelector(selectNavigation)

  return tab.scratchpad !== true ? (
    <>
      <div className='note-sidebar-container' style={{ width: noteSideBarWidth }}>
        <aside className='note-sidebar'>
          <NoteSidebarHeader />
          <NoteList />
        </aside>
      </div>

      <Resizer component='NoteSideBar' />
    </>
  ) : null
}