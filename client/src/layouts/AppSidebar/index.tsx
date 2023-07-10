import { useContext, useState } from 'react'
import { ResizerContext } from '../../context';

import ScratchpadIcon from '../../components/Icons/ScratchpadIcon';
import NoteIcon from '../../components/Icons/NoteIcon';
import FavoritesIcon from '../../components/Icons/FavoritesIcon';
import TrashIcon from '../../components/Icons/TrashIcon';
import AppSidebarButton from '../../components/Buttons/AppSidebarButton';
import NewNoteButton from '../../components/Buttons/NewNoteButton';
import Categories from '../../components/Categories';
import Resizer from '../../components/Reziser';

import './style.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectNotes, setSelectedNote } from '../../store/notes/notesSlice';
import { Note } from '../../interfaces/Note';

type Props = {}
type Tabs = 'Notes' | 'Scratchpad' | 'Favorites' | 'Trash'

const AppSideBar = ({ }: Props) => {
  const dispatch = useAppDispatch()
  const notes = useAppSelector(selectNotes)
  const { appSideBarWidth } = useContext(ResizerContext);
  const [tab, setTab] = useState<Tabs>('Notes')

  const toggleScratchpad = () => {
    const scratchPadNote = notes.find((note) => note.scratchPad === true)!

    dispatch(setSelectedNote({ note: scratchPadNote }))

    setTab('Scratchpad')
  }

  const toggleNotes = () => {
    if (tab === 'Notes') return

    const NOTE_LIST_HAS_NOTES: boolean = notes.some((note, i) => i !== 0 && note.scratchPad === undefined)

    if (NOTE_LIST_HAS_NOTES !== true) {
      dispatch(setSelectedNote({ note: null }))
      setTab('Notes')
      return
    }

    const firstNote: Note = notes.find((note) => note.scratchPad !== true)!
    dispatch(setSelectedNote({ note: firstNote }))

    setTab('Notes')
  }

  const toggleFavorites = () => {
    console.log('favorites')
  }

  const toggleTrash = () => {
    console.log('trash')
  }

  return (
    <>
      <aside className='app-sidebar' style={{ width: appSideBarWidth }}>
        <NewNoteButton />

        <section>
          <AppSidebarButton heading='Scratchpad' selected={tab === 'Scratchpad'} onClick={toggleScratchpad}>
            <ScratchpadIcon className='app-sidebar-icon' width={15} height={15} />
          </AppSidebarButton>

          <AppSidebarButton heading='Notes' selected={tab === 'Notes'} onClick={toggleNotes}>
            <NoteIcon className='app-sidebar-icon' width={15} height={15} />
          </AppSidebarButton>

          <AppSidebarButton heading='Favorites' selected={tab === 'Favorites'} onClick={toggleFavorites}>
            <FavoritesIcon className='app-sidebar-icon' width={15} height={15} />
          </AppSidebarButton>

          <AppSidebarButton heading='Trash' selected={tab === 'Trash'} onClick={toggleTrash}>
            <TrashIcon className='app-sidebar-icon' width={15} height={15} />
          </AppSidebarButton>

          <Categories />
        </section>
      </aside>

      <Resizer component='AppSideBar' />
    </>
  )
}

export default AppSideBar