import { useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import { deleteNote, getNotes, setNoteCategory, toggleFavorite, toggleTrash } from '../../../../../store/notes/notesSlice'
import FavoritesIcon from '../../../../Icons/FavoritesIcon'
import TrashIcon from '../../../../Icons/TrashIcon'
import DownloadIcon from '../../../../Icons/DownloadIcon'
import ClipboardIcon from '../../../../Icons/ClipboardIcon'
import RestoreFromTrashIcon from '../../../../Icons/RestoreFromTrashIcon'
import DeleteIcon from '../../../../Icons/DeleteIcon'
import { selectNavigation, setNavigation } from '../../../../../store/navigation/navigationSlice'
import { ActiveNoteTooltipContext } from '../../../../../context/ActiveNoteTooltipContext'
import './style.scss'
import CloseIcon from '../../../../Icons/CloseIcon'

type Props = {
  noteId: string
  noteCategory: string | null
  isTrash: boolean
  isFavorite: boolean
}

export const NoteTooltipOptions = ({ noteId, noteCategory, isTrash, isFavorite }: Props) => {
  const dispatch = useAppDispatch()
  const { tab } = useAppSelector(selectNavigation)
  const { clearActiveNoteId } = useContext(ActiveNoteTooltipContext)

  const markAsFavorite = () => {
    dispatch(toggleFavorite({ noteId, tab }))
    clearActiveNoteId()
  }

  const moveToTrash = () => {
    dispatch(toggleTrash({ noteId, tab }));
    clearActiveNoteId()
  };

  const removePermanently = () => {
    dispatch(deleteNote({ noteId, tab }))
    clearActiveNoteId()
  }

  const removeCategory = () => {
    dispatch(setNoteCategory({ categoryId: null, noteId }))
    clearActiveNoteId()
  }

  const downloadNote = () => {
    // Todo
  };

  const copyReferenceNote = () => {
    // Todo
  };

  return (
    <nav className='options-nav'>
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
  );
};
