import { useContext } from 'react'

import NoteSidebarHeader from './NoteSidebarHeader'
import NoteList from '../../components/NoteList'
import Resizer from '../../components/Reziser'
import { ResizerContext } from '../../context'
import { useAppSelector } from '../../hooks/hooks'
import { selectSelectedNote } from '../../store/notes/notesSlice'
import './style.scss'

export default function NoteSideBar() {
  const { noteSideBarWidth } = useContext(ResizerContext);
  const selectedNote = useAppSelector(selectSelectedNote)
  const IS_SCRATCHPAD_NOT_SELECTED_NOTE = selectedNote?.scratchPad !== true

  return IS_SCRATCHPAD_NOT_SELECTED_NOTE ? (
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