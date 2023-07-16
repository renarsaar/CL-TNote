import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { selectSelectedNote, setSelectedNote } from '../../../store/notes/notesSlice'
import Category from './Category'
import FavoritesIcon from '../../Icons/FavoritesIcon'
import OptionsIcon from '../../Icons/OptionsIcon'
import { Note } from '../../../interfaces/Note'
import './style.scss'

type Props = {
  note: Note,
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
  const { favorite, text } = note
  const dispatch = useAppDispatch()
  const selectedNote = useAppSelector(selectSelectedNote)

  const handleOnClick = () => {
    const IS_SAME_NOTE_SELECTED: boolean = note.id === selectedNote?.id
    if (IS_SAME_NOTE_SELECTED) return

    dispatch(setSelectedNote({ note }))
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

          <div className="truncate-text">
            {handleTitle(text)}
          </div>
        </div>

        <div className="note-options">
          <OptionsIcon />

          <span className="sr-only" />
        </div>
      </div>

      <Category note={note} />
    </div>
  )
}

export default NoteItem