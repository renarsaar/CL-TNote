import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { selectNotes } from '../../store/notes/notesSlice'
import NoteItem from './NoteItem'
import { Note } from '../../interfaces/Note'
import { selectNavigation } from '../../store/navigation/navigationSlice'
import './style.scss'

export default function NoteList() {
  const dispatch = useAppDispatch()
  const navigation = useAppSelector(selectNavigation)
  const notes: Note[] = useAppSelector(selectNotes)
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes)

  useEffect(() => {
    const { tab } = navigation

    setFilteredNotes(() => notes)

    switch (true) {
      case tab === 'favorites':
        const favoriteNotes = notes.filter((note) => note.favorite === true && note.trash !== true)

        setFilteredNotes(() => favoriteNotes)

        break

      case tab === 'trash':
        const trashNotes = notes.filter((note) => note.trash === true)

        setFilteredNotes(() => trashNotes)

        break

      default:
        const nonTrashNotes = notes.filter((note) => note.trash !== true)

        setFilteredNotes(() => nonTrashNotes)

        break
    }

  }, [navigation, notes, dispatch])

  return (
    <div className="note-list">
      {filteredNotes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
        />
      ))}
    </div>
  )
}