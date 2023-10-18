import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { selectNotes } from '../../store/notes/notesSlice'
import { selectNavigation } from '../../store/navigation/navigationSlice'
import { selectSelectedCategory } from '../../store/categories/categorySlice'
import { SearchContext } from '../../context/SearchContext'
import { ConfigContext } from '../../context/ConfigContext'
import { ConfigContextState } from '../../context/types'
import NoteItem from './NoteItem'
import { Note } from '../../interfaces/Note'
import './style.scss'

export default function NoteList() {
  const dispatch = useAppDispatch()
  const navigation = useAppSelector(selectNavigation)
  const notes: Note[] = useAppSelector(selectNotes)
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes)
  const selectedCategory = useAppSelector(selectSelectedCategory)
  const { searchTerm } = useContext(SearchContext)
  const { configs: { notesSortBy } } = useContext<ConfigContextState>(ConfigContext)

  const filterNotesBySearchTerm = (noteList: Note[]): Note[] => {
    if (searchTerm !== '') {
      return noteList.filter((note) => note.text.toLowerCase().includes(searchTerm.toLowerCase()))
    } else {
      return noteList
    }
  }

  const sortNotes = (): void => {
    let sortedNotes = [...filteredNotes]

    switch (true) {
      case notesSortBy === 'title':
        sortedNotes = sortedNotes.sort((a, b) => a.text.localeCompare(b.text))

        break

      case notesSortBy === 'dateCreated':
        sortedNotes = sortedNotes.sort((a, b) => moment(a.created).valueOf() - moment(b.created).valueOf())

        break

      case notesSortBy === 'lastUpdated':
        sortedNotes = sortedNotes.sort((a, b) => moment(b.lastUpdated).valueOf() - moment(a.lastUpdated).valueOf())

        break

      default:
        break
    }

    setFilteredNotes(sortedNotes)
  }

  useEffect(() => {
    sortNotes()
  }, [notesSortBy])


  useEffect(() => {
    const { tab } = navigation

    setFilteredNotes(notes)

    switch (true) {
      case tab === 'favorites':
        let favoriteNotes = notes.filter((note) => note.favorite === true && note.trash !== true)

        favoriteNotes = filterNotesBySearchTerm(favoriteNotes)

        setFilteredNotes(favoriteNotes)

        break

      case tab === 'trash':
        let trashNotes = notes.filter((note) => note.trash === true)

        trashNotes = filterNotesBySearchTerm(trashNotes)

        setFilteredNotes(trashNotes)

        break

      case tab === 'notes':
        let nonTrashNotes = notes.filter((note) => note.trash !== true)

        nonTrashNotes = filterNotesBySearchTerm(nonTrashNotes)

        setFilteredNotes(nonTrashNotes)

        break

      default:
        if (!selectedCategory?.id) {
          let defaultNotes = notes

          defaultNotes = filterNotesBySearchTerm(defaultNotes)

          setFilteredNotes(defaultNotes)
        } else {
          let categorizedNotes = notes.filter((note) => note.category === selectedCategory?.id)

          categorizedNotes = filterNotesBySearchTerm(categorizedNotes)

          setFilteredNotes(categorizedNotes)
        }

        break
    }
  }, [navigation, notes, dispatch, selectedCategory?.id, searchTerm])

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