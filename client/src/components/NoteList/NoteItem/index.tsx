import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { pruneNotes, selectSelectedNote, setSelectedNote } from '../../../store/notes/notesSlice'
import Category from './Category'
import NoteOptions from './NoteOptions'
import FavoritesIcon from '../../Icons/FavoritesIcon'
import { Note } from '../../../interfaces/Note'
import './style.scss'

type Props = {
  note: Note
}

const handleTitle = (text: string): string => {
  let title: string = text
  title = title.split('\n')[0]
  title = title.split('#')[0]
  title = title.substring(0, 40)

  if (title.trim().length === 0) return 'New note'
  return title
}

const NoteItem = ({ note }: Props) => {
  const dispatch = useAppDispatch()
  const selectedNote = useAppSelector(selectSelectedNote)
  const { favorite, text } = note

  const handleOnClick = () => {
    // Clicked on same note
    if (note.id === selectedNote?.id) return

    dispatch(setSelectedNote({ note }))
    dispatch(pruneNotes())
  }

  return (
    <div
      className={selectedNote?.id === note.id ? 'note-list-item selected' : 'note-list-item'}
      onClick={handleOnClick}
    >
      <div className="note-list-outer">
        <div className="note-title">
          <div className="icon">
            {favorite === true && (
              <FavoritesIcon
                className='note-sidebar-favorites-icon'
                width={15}
                height={15}
              />
            )}
          </div>

          <div className="truncate-text">{handleTitle(text)}</div>
        </div>

        <NoteOptions
          noteId={note.id}
          isTrash={note.trash}
          isFavorite={note.favorite}
          selectedNoteId={selectedNote?.id!}
        />
      </div>

      <Category note={note} />
    </div>
  )
}

export default NoteItem