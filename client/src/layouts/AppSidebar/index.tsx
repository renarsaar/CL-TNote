import { useContext } from 'react'
import { ResizerContext } from '../../context'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { pruneNotes, selectNotes, setSelectedNote } from '../../store/notes/notesSlice'
import { selectNavigation, setNavigation } from '../../store/navigation/navigationSlice'
import { setSelectedCategory } from '../../store/categories/categorySlice'

import ScratchpadIcon from '../../components/Icons/ScratchpadIcon'
import NoteIcon from '../../components/Icons/NoteIcon'
import FavoritesIcon from '../../components/Icons/FavoritesIcon'
import TrashIcon from '../../components/Icons/TrashIcon'
import NewNoteButton from '../../components/Buttons/NewNoteButton'
import CategoryList from '../../components/CategoryList'
import Resizer from '../../components/Reziser'

import './style.scss'

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

        <section className='app-sidebar-btn-container'>
          <button
            className={tab === 'scratchpad' ? 'app-sidebar-btn selected' : 'app-sidebar-btn'}
            onClick={toggleScratchpad}
          >
            <ScratchpadIcon
              className='app-sidebar-icon'
              width={15}
              height={15}
            />

            Scratchpad
          </button>

          <button
            className={tab === 'notes' ? 'app-sidebar-btn selected' : 'app-sidebar-btn'}
            onClick={toggleNotes}
          >
            <NoteIcon
              className='app-sidebar-icon'
              width={15}
              height={15}
            />

            Notes
          </button>

          <button
            className={tab === 'favorites' ? 'app-sidebar-btn selected' : 'app-sidebar-btn'}
            onClick={toggleFavorites}
          >
            <FavoritesIcon
              className='app-sidebar-icon'
              width={15}
              height={15}
            />

            Favorites
          </button>

          <button
            className={tab === 'trash' ? 'app-sidebar-btn selected' : 'app-sidebar-btn'}
            onClick={toggleTrash}
          >
            <TrashIcon
              className='app-sidebar-icon'
              width={15}
              height={15}
            />

            Trash
          </button>

          <CategoryList />
        </section>
      </aside>

      <Resizer component='AppSideBar' />
    </>
  )
}

export default AppSideBar