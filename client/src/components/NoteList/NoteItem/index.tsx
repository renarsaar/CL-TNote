import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { pruneNotes, selectSelectedNote, setSelectedNote } from '../../../store/notes/notesSlice'
import NoteCategory from './NoteCategory'
import NoteOptionsButton from './NoteOptionsButton'
import FavoritesIcon from '../../Icons/FavoritesIcon'
import NoteTooltip from './NoteTooltip'
import NoteTitle from './NoteTitle'
import { Note } from '../../../interfaces/Note'
import './style.scss'

type Props = {
  note: Note
}

const NoteItem = ({ note }: Props) => {
  const dispatch = useAppDispatch()
  const selectedNote = useAppSelector(selectSelectedNote)
  const { favorite, text, category } = note
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)
  const handleSetTooltipX = (clientX: number) => setTooltipX(() => clientX)
  const handleSetTooltipY = (clientY: number) => setTooltipY(() => clientY)

  const handleOnClick = () => {
    // Clicked on same note
    if (note.id === selectedNote?.id) return

    dispatch(setSelectedNote({ note }))
    dispatch(pruneNotes())
  }

  return (
    <>
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

            <NoteTitle noteId={note.id} text={text} />
          </div>

          <NoteOptionsButton
            noteId={note.id}
            selectedNoteId={selectedNote?.id!}
            setTooltipX={handleSetTooltipX}
            setTooltipY={handleSetTooltipY}
          />
        </div>

        <NoteCategory category={category} />
      </div>

      <NoteTooltip
        noteId={note.id}
        noteCategory={note.category}
        isTrash={note.trash}
        isFavorite={note.favorite}
        tooltipX={tooltipX}
        tooltipY={tooltipY}
      />
    </>
  )
}

export default NoteItem