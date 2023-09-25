import { useContext } from 'react'
import { selectNavigation } from '../../store/navigation/navigationSlice'
import { ResizerContext } from '../../context'
import { useAppSelector } from '../../hooks/hooks'
import NoteSidebarHeader from './NoteSidebarHeader'
import NoteList from '../../components/NoteList'
import Resizer from '../../components/Reziser'
import './style.scss'

export default function NoteSideBar() {
  const { noteSideBarWidth } = useContext(ResizerContext)
  const { tab } = useAppSelector(selectNavigation)

  return tab !== 'scratchpad' ? (
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