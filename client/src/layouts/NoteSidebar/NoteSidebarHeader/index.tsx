import { useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { ActiveNoteTooltipContext } from '../../../context/ActiveNoteTooltipContext'
import { selectNavigation } from '../../../store/navigation/navigationSlice'
import { clearTrashNotes, selectNotes } from '../../../store/notes/notesSlice'
import './style.scss'

const NoteSidebarHeader = () => {
  const dispatch = useAppDispatch()
  const { tab } = useAppSelector(selectNavigation)
  const { clearActiveNoteId } = useContext(ActiveNoteTooltipContext)
  const notes = useAppSelector(selectNotes)
  const trashNotes = notes.filter((note) => note.trash === true)

  const onClick = () => {
    dispatch(clearTrashNotes())
    clearActiveNoteId()
  }

  return (
    <div className='note-sidebar-header'>
      <input
        data-testid='note-search'
        type='search'
        placeholder='Search for notes'
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