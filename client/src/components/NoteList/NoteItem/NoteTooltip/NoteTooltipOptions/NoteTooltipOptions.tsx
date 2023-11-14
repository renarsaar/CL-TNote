import { useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import { NoteTooltipContext } from '../../../../../context/NoteTooltipContext'
import { deleteNote, setNoteCategory, toggleFavorite, toggleTrash } from '../../../../../store/notes/notesSlice'
import { selectNavigation } from '../../../../../store/navigation/navigationSlice'
import { ConfigContext } from '../../../../../context'
import { ConfigContextState } from '../../../../../context/types'
import FavoritesIcon from '../../../../Icons/FavoritesIcon'
import TrashIcon from '../../../../Icons/TrashIcon'
import DownloadIcon from '../../../../Icons/DownloadIcon'
import ClipboardIcon from '../../../../Icons/ClipboardIcon'
import RestoreFromTrashIcon from '../../../../Icons/RestoreFromTrashIcon'
import DeleteIcon from '../../../../Icons/DeleteIcon'
import CloseIcon from '../../../../Icons/CloseIcon'
import './style.scss'

type Props = {
  noteId: string
  noteCategory: string | null
  isTrash: boolean
  isFavorite: boolean
}

export const NoteTooltipOptions = ({ noteId, noteCategory, isTrash, isFavorite }: Props) => {
  const dispatch = useAppDispatch()
  const { tab } = useAppSelector(selectNavigation)
  const noteTooltipContext = useContext(NoteTooltipContext)
  const { configs: { theme } } = useContext<ConfigContextState>(ConfigContext)

  const markAsFavorite = () => {
    dispatch(toggleFavorite({ noteId, tab }))
    noteTooltipContext.clearNoteId()
  }

  const moveToTrash = () => {
    dispatch(toggleTrash({ noteId, tab }));
    noteTooltipContext.clearNoteId()
  }

  const removePermanently = () => {
    dispatch(deleteNote({ noteId, tab }))
    noteTooltipContext.clearNoteId()
  }

  const removeCategory = () => {
    dispatch(setNoteCategory({ categoryId: null, noteId }))
    noteTooltipContext.clearNoteId()
  }

  const downloadNote = () => {
    // Todo
  }

  const copyReferenceNote = () => {
    // Todo
  }

  return (
    <nav className={theme === 'light' ? 'options-nav' : 'options-nav dark-mode'}>
      <div
        role='button'
        className={isTrash === true ? 'options-nav-item trash' : 'options-nav-item'}
        onClick={isTrash === true ? removePermanently : markAsFavorite}
      >
        {tab === 'trash' ?
          <>
            <DeleteIcon className='options-context-icon' width={15} height={15} />

            Delete permanently
          </> :
          <>
            <FavoritesIcon className='options-context-icon' width={15} height={15} />

            {isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
          </>
        }
      </div>

      <div
        role='button'
        className={isTrash === true ? 'options-nav-item' : 'options-nav-item trash'}
        onClick={moveToTrash}
      >
        {isTrash === true ?
          <>
            <RestoreFromTrashIcon className='options-context-icon' width={15} height={15} />

            Restore from trash
          </> :
          <>
            <TrashIcon className='options-context-icon' width={15} height={15} />

            Move to trash
          </>
        }
      </div>

      {noteCategory !== null &&
        <div
          role='button'
          className='options-nav-item'
          onClick={removeCategory}
        >
          <CloseIcon className='options-context-icon' width={15} height={15} />

          Remove category
        </div>
      }

      <div
        role='button'
        className='options-nav-item'
        onClick={downloadNote}
      >
        <DownloadIcon className='options-context-icon' width={15} height={15} />

        Download
      </div>

      <div
        role='button'
        className='options-nav-item'
        onClick={copyReferenceNote}
      >
        <ClipboardIcon className='options-context-icon' width={15} height={15} />

        Copy reference to note
      </div>
    </nav>
  )
}
