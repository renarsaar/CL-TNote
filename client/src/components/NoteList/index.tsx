import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { selectNotes } from '../../store/notes/notesSlice'
import { selectNavigation } from '../../store/navigation/navigationSlice'
import { selectSelectedCategory } from '../../store/categories/categorySlice'
import NoteItem from './NoteItem'
import { Note } from '../../interfaces/Note'
import './style.scss'

export default function NoteList() {
  const dispatch = useAppDispatch()
  const navigation = useAppSelector(selectNavigation)
  const notes: Note[] = useAppSelector(selectNotes)
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes)
  const selectedCategory = useAppSelector(selectSelectedCategory)

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

      case tab === 'notes':
        const nonTrashNotes = notes.filter((note) => note.trash !== true)

        setFilteredNotes(() => nonTrashNotes)

        break

      default:
        if (!selectedCategory?.id) {
          setFilteredNotes(() => notes)
        } else {
          const categorizedNotes = notes.filter((note) => note.category === selectedCategory?.id)

          setFilteredNotes(() => categorizedNotes)
        }

        break
    }
  }, [navigation, notes, dispatch, selectedCategory?.id])

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