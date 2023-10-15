import { useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { ActiveNoteTooltipContext } from '../../../context/ActiveNoteTooltipContext'
import { SearchContext } from '../../../context/SearchContext'
import { selectNavigation } from '../../../store/navigation/navigationSlice'
import { clearTrashNotes, selectNotes } from '../../../store/notes/notesSlice'
import './style.scss'

const NoteSidebarHeader = () => {
  const dispatch = useAppDispatch()
  const { tab } = useAppSelector(selectNavigation)
  const { clearActiveNoteId } = useContext(ActiveNoteTooltipContext)
  const { setSearchTerm } = useContext(SearchContext)
  const notes = useAppSelector(selectNotes)
  const trashNotes = notes.filter((note) => note.trash === true)

  const onClick = () => {
    dispatch(clearTrashNotes())
    clearActiveNoteId()
  }

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearchTerm(value)
  }

  /**
    Todo
      check codemirror docs to see options about highlighting
      + handleTitle needs some styling
   */

  return (
    <div className='note-sidebar-header'>
      <input
        data-testid='note-search'
        type='search'
        placeholder='Search for notes'
        onChange={onChange}
      />

      {(tab === 'trash' && trashNotes.length !== 0) &&
        <>
          <button
            className='empty-trash-button'
            title='Empty'
            onClick={onClick}
          >
            Empty
          </button>
        </>
      }
    </div>
  )
}

export default NoteSidebarHeader