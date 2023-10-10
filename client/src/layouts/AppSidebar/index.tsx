import { useContext } from 'react'
import { ResizerContext } from '../../context'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { pruneNotes, selectNotes, setSelectedNote } from '../../store/notes/notesSlice'
import { selectNavigation, setNavigation } from '../../store/navigation/navigationSlice'

import ScratchpadIcon from '../../components/Icons/ScratchpadIcon'
import NoteIcon from '../../components/Icons/NoteIcon'
import FavoritesIcon from '../../components/Icons/FavoritesIcon'
import TrashIcon from '../../components/Icons/TrashIcon'
import AppSidebarButton from '../../components/Buttons/AppSidebarButton'
import NewNoteButton from '../../components/Buttons/NewNoteButton'
import CategoryList from '../../components/CategoryList'
import Resizer from '../../components/Reziser'

import './style.scss'
import { setSelectedCategory } from '../../store/categories/categorySlice'

const AppSideBar = () => {
  const dispatch = useAppDispatch()
  const { appSideBarWidth } = useContext(ResizerContext)
  const { tab } = useAppSelector(selectNavigation)
  const notes = useAppSelector(selectNotes)

  const toggleScratchpad = () => {
    dispatch(pruneNotes())
    dispatch(setNavigation('scratchpad'))
    dispatch(setSelectedCategory({ category: null }))
  }

  const toggleNotes = () => {
    dispatch(pruneNotes())
    dispatch(setNavigation('notes'))
    dispatch(setSelectedCategory({ category: null }))

    const nonTrashNotes = notes.filter((note) => note.trash !== true)

    dispatch(setSelectedNote({ note: nonTrashNotes[0] }))
  }

  const toggleFavorites = () => {
    dispatch(pruneNotes())
    dispatch(setNavigation('favorites'))
    dispatch(setSelectedCategory({ category: null }))

    const favoriteNotes = notes.filter((note) => note.favorite === true && note.trash !== true)

    dispatch(setSelectedNote({ note: favoriteNotes[0] }))
  }

  const toggleTrash = () => {
    dispatch(pruneNotes())
    dispatch(setNavigation('trash'))
    dispatch(setSelectedCategory({ category: null }))

    const trashNotes = notes.filter((note) => note.trash === true)

    dispatch(setSelectedNote({ note: trashNotes[0] }))
  }

  return (
    <>
      <aside className='app-sidebar' style={{ width: appSideBarWidth }}>
        <NewNoteButton />

        <section>
          <AppSidebarButton
            heading='Scratchpad'
            selected={tab === 'scratchpad'}
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
            selected={tab === 'notes'}
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
            selected={tab === 'favorites'}
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
            selected={tab === 'trash'}
            onClick={toggleTrash}
          >
            <TrashIcon
              className='app-sidebar-icon'
              width={15}
              height={15}
            />
          </AppSidebarButton>

          <CategoryList />
        </section>
      </aside>

      <Resizer component='AppSideBar' />
    </>
  )
}

export default AppSideBar