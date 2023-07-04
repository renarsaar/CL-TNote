import { useAppSelector } from '../../hooks/hooks';
import { selectNotes } from '../../store/notes/notesSlice';
import NoteItem from './NoteItem';
import { Note } from '../../interfaces/Note';
import './style.scss'

export default function NoteList() {
  const notes: Note[] = useAppSelector(selectNotes)

  return (
    <div className="note-list">
      {notes.map((note) => <NoteItem key={note.id} note={note} />)}
    </div>
  )
}