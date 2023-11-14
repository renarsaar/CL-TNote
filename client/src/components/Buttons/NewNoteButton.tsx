import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { selectNavigation, setNavigation } from '../../store/navigation/navigationSlice'
import { createNote } from '../../store/notes/notesSlice'
import { selectSelectedCategory } from '../../store/categories/categorySlice'
import NewNoteIcon from '../Icons/NewNoteIcon'
import '../../assets/_variables.scss'
import './style.scss'

const NewNoteButton = () => {
  const dispatch = useAppDispatch()
  const navigation = useAppSelector(selectNavigation)
  const selectedCategory = useAppSelector(selectSelectedCategory)

  const handleOnClick = () => {
    const { tab } = navigation

    switch (true) {
      case tab === 'favorites':
        dispatch(createNote({ favorite: true, category: null }))
        break;

      case tab === 'notes':
        dispatch(createNote({ favorite: false, category: null }))
        break;

      case tab === 'scratchpad':
        dispatch(setNavigation('notes'))
        dispatch(createNote({ favorite: false, category: null }))

        break;

      case tab === 'trash':
        dispatch(setNavigation('notes'))
        dispatch(createNote({ favorite: false, category: null }))

        break;

      default:
        dispatch(createNote({ favorite: false, category: selectedCategory!.id }))
        break;
    }
  }

  return (
    <button
      className='new-note-button'
      onClick={handleOnClick}
    >
      <NewNoteIcon className='new-note-button-icon' width={18} height={18} />

      <span>New note</span>
    </button>
  )
}

export default NewNoteButton