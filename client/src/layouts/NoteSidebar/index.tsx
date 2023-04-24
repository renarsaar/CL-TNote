import { useContext } from 'react'

import NoteSidebarHeader from './NoteSidebarHeader'
import NoteList from '../../components/NoteList'
import Resizer from '../../components/Reziser'
import { ResizerContext } from '../../context'
import './style.scss'

export default function NoteSideBar() {
  const { noteSideBarWidth } = useContext(ResizerContext);

  return (
    <>
      <div className='note-sidebar-container' style={{ width: noteSideBarWidth }}>
        <aside className='note-sidebar'>
          <NoteSidebarHeader />
          <NoteList />
        </aside>
      </div>

      <Resizer component='NoteSideBar' />
    </>
  )
}