import { useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { NoteTooltipContext } from '../../../context/NoteTooltipContext'
import { SearchContext } from '../../../context/SearchContext'
import { selectNavigation } from '../../../store/navigation/navigationSlice'
import { clearTrashNotes, selectNotes } from '../../../store/notes/notesSlice'
import './style.scss'
import { ConfigContext } from '../../../context'

const NoteSidebarHeader = () => {
  const dispatch = useAppDispatch()
  const notes = useAppSelector(selectNotes)
  const { tab } = useAppSelector(selectNavigation)
  const noteTooltipContext = useContext(NoteTooltipContext)
  const { setSearchTerm } = useContext(SearchContext)
  const { configs: { theme } } = useContext(ConfigContext)
  const trashNotes = notes.filter((note) => note.trash === true)

  const onClick = () => {
    dispatch(clearTrashNotes())
    noteTooltipContext.clearNoteId()
  }

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearchTerm(value)
  }

  return (
    <div className={theme === 'light' ? 'note-sidebar-header' : 'note-sidebar-header dark-mode'}>
      <input
        data-testid='note-search'
        type='search'
        placeholder='Search for notes'
        onChange={onChange}
      />

      {(tab === 'trash' && trashNotes.length !== 0) &&
        <button
          className='empty-trash-btn'
          title='Empty'
          onClick={onClick}
        >
          Empty
        </button>
      }
    </div>
  )
}

export default NoteSidebarHeader