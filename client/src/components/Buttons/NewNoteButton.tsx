import { useContext } from 'react'
import { ConfigContext } from '../../context'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { selectNavigation, setNavigation } from '../../store/navigation/navigationSlice'
import { createNote } from '../../store/notes/notesSlice'
import NewNoteIcon from '../Icons/NewNoteIcon'
import '../../assets/_variables.scss'
import './style.scss'

const NewNoteButton = () => {
  const dispatch = useAppDispatch()
  const navigation = useAppSelector(selectNavigation)
  const { configs } = useContext(ConfigContext)
  const { theme } = configs

  const handleOnClick = () => {
    const { tab } = navigation

    switch (true) {
      case tab === 'favorites':
        dispatch(createNote({ favorite: true }))
        break;

      case tab === 'notes':
        dispatch(createNote({ favorite: false }))
        break;

      case tab === 'scratchpad':
        dispatch(setNavigation('notes'))
        dispatch(createNote({ favorite: false }))

        break;

      case tab === 'trash':
        dispatch(setNavigation('notes'))
        dispatch(createNote({ favorite: false }))

        break;

      default:
        break;
    }
  }

  return (
    <button
      className={theme === 'dark' ? 'new-note-button dark' : 'new-note-button'}
      onClick={handleOnClick}
    >
      <NewNoteIcon className='new-note-button-icon' width={18} height={18} />

      <span>New note</span>
    </button>
  )
}

export default NewNoteButton