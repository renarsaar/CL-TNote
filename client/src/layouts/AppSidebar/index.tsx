import { useContext } from 'react'
import { ResizerContext } from '../../context';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectNotes, setSelectedNote } from '../../store/notes/notesSlice';
import { selectNavigation, setNavigation } from '../../store/navigation/navigationSlice';

import ScratchpadIcon from '../../components/Icons/ScratchpadIcon';
import NoteIcon from '../../components/Icons/NoteIcon';
import FavoritesIcon from '../../components/Icons/FavoritesIcon';
import TrashIcon from '../../components/Icons/TrashIcon';
import AppSidebarButton from '../../components/Buttons/AppSidebarButton';
import NewNoteButton from '../../components/Buttons/NewNoteButton';
import Categories from '../../components/Categories';
import Resizer from '../../components/Reziser';

import './style.scss';

const AppSideBar = () => {
  const dispatch = useAppDispatch()
  const notes = useAppSelector(selectNotes)
  const tab = useAppSelector(selectNavigation)
  const { appSideBarWidth } = useContext(ResizerContext);

  const toggleScratchpad = () => {
    dispatch(setNavigation({ name: 'scratchpad', value: true }))
  }

  const toggleNotes = () => {
    if (tab.notes === true) return

    const NOTE_LIST_HAS_NOTES: boolean = notes.length !== 0
    if (NOTE_LIST_HAS_NOTES !== true) {
      dispatch(setSelectedNote({ note: null }))
    }

    dispatch(setNavigation({ name: 'notes', value: true }))
  }

  const toggleFavorites = () => {
    dispatch(setNavigation({ name: 'favorites', value: true }))
  }

  const toggleTrash = () => {
    dispatch(setNavigation({ name: 'trash', value: true }))
  }

  return (
    <>
      <aside className='app-sidebar' style={{ width: appSideBarWidth }}>
        <NewNoteButton />

        <section>
          <AppSidebarButton
            heading='Scratchpad'
            selected={tab.scratchpad === true}
            onClick={toggleScratchpad}
          >
            <ScratchpadIcon
              className='app-sidebar-icon'
              width={15}
              height={15}
            />
          </AppSidebarButton>

          <AppSidebarButton
            heading='Notes'
            selected={tab.notes === true}
            onClick={toggleNotes}
          >
            <NoteIcon
              className='app-sidebar-icon'
              width={15}
              height={15}
            />
          </AppSidebarButton>

          <AppSidebarButton
            heading='Favorites'
            selected={tab.favorites === true}
            onClick={toggleFavorites}
          >
            <FavoritesIcon
              className='app-sidebar-icon'
              width={15}
              height={15}
            />
          </AppSidebarButton>

          <AppSidebarButton
            heading='Trash'
            selected={tab.trash === true}
            onClick={toggleTrash}
          >
            <TrashIcon
              className='app-sidebar-icon'
              width={15}
              height={15}
            />
          </AppSidebarButton>

          <Categories />
        </section>
      </aside>

      <Resizer component='AppSideBar' />
    </>
  )
}

export default AppSideBar