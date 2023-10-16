import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { RootState } from '../store'
import { Note } from '../../interfaces/Note'

type NoteState = {
  notes: Note[],
  selectedNote: Note | null
}

const initialState: NoteState = {
  notes: [],
  selectedNote: null
}

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    getNotes: (state: NoteState) => {
      const notes: string | null = localStorage.getItem('notes')

      if (notes === null) {
        const testNotes: Note[] = [
          {
            id: uuidv4(),
            category: null,
            text: 'Welcome to Takenote!\n\nTakeNote is a free, open-source notes app for the web. It is a demo project only, and does not integrate with any database or cloud. Your notes are saved in local storage and will not be permanently persisted, but are available for download.\n\nView the source on [Github](https://github.com/taniarascia/takenote).\n\n## Features\n\n- **Plain text notes** - take notes in an IDE-like environment that makes no assumptions\n- **Markdown preview** - view rendered HTML\n- **Linked notes** - use `{{uuid}}` syntax to link to notes within other notes\n- **Syntax highlighting** - light and dark mode available (based on the beautiful [New Moon theme](https://taniarascia.github.io/new-moon/))\n- **Keyboard shortcuts** - use the keyboard for all common tasks - creating notes and categories, toggling settings, and other options\n- **Drag and drop** - drag a note or multiple notes to categories, favorites, or trash\n- **Multi-cursor editing** - supports multiple cursors and other [Codemirror](https://codemirror.net/) options\n- **Search notes** - easily search all notes, or notes within a category\n- **Prettify notes** - use Prettier on the fly for your Markdown\n- **No WYSIWYG** - made for developers, by developers\n- **No database** - notes are only stored in the browser&apos;s local storage and are available for download and export to you alone\n- **No tracking or analytics** - &apos;nuff said\n- **GitHub integration** - self-hosted option is available for auto-syncing to a GitHub repository (not available in the demo)\n',
            favorite: false,
            trash: false,
            created: moment().toISOString(true),
            lastUpdated: null
          }
        ]

        state.notes = testNotes
        state.selectedNote = testNotes[0]

        localStorage.setItem('notes', JSON.stringify({ ...state }))
      } else {
        const newNotes: NoteState = JSON.parse(notes)

        const SELECTED_NOTE_NOT_NULL_IN_LOCAL_STORAGE: boolean = newNotes.selectedNote !== null
        if (SELECTED_NOTE_NOT_NULL_IN_LOCAL_STORAGE !== true) {
          newNotes.selectedNote = null
          state.selectedNote = null
        }

        state.notes = newNotes.notes
        state.selectedNote = newNotes.notes[0]
      }
    },
    setSelectedNote: (state: NoteState, action: PayloadAction<{ note: Note | null | undefined }>) => {
      const { note } = action.payload

      !note
        ? state.selectedNote = null
        : state.selectedNote = note

      localStorage.setItem('notes', JSON.stringify({ ...state }))
    },
    createNote: (state: NoteState, action: PayloadAction<{ favorite: boolean, category: string | null }>) => {
      const { favorite, category } = action.payload
      const note: Note = {
        id: uuidv4(),
        category,
        text: '',
        favorite,
        trash: false,
        created: moment().toISOString(true),
        lastUpdated: null
      }

      // Check if previously created note is empty
      if (state.selectedNote?.text === '') return

      state.notes.push(note)
      state.selectedNote = note

      localStorage.setItem('notes', JSON.stringify({ ...state }))
    },
    editNoteText: (state: NoteState, action: PayloadAction<{ noteId: string, value: string }>) => {
      const { noteId, value } = action.payload
      const existingNote: Note = state.notes.find((e: Note) => e.id === noteId)!

      existingNote.text = value
      existingNote.lastUpdated = moment().toISOString(true)

      state.selectedNote = existingNote

      localStorage.setItem('notes', JSON.stringify({ ...state }))
    },
    toggleFavorite: (state: NoteState, action: PayloadAction<{ noteId: string, tab: string }>) => {
      const { noteId, tab } = action.payload
      const existingNote: Note = state.notes.find((note) => note.id === noteId)!

      existingNote.favorite = !existingNote.favorite
      existingNote.lastUpdated = moment().toISOString(true)

      // Set new selectedNote
      if (state.selectedNote !== null) {
        switch (true) {
          case tab === 'notes':
            const nonTrashNotes = state.notes.filter((note) => note.trash !== true)

            if (!nonTrashNotes.includes(existingNote)) {
              state.selectedNote = nonTrashNotes[0] || null
            }

            break

          case tab === 'favorites':
            const favoriteNotes = state.notes.filter((note) => note.favorite === true && note.trash !== true)

            if (!favoriteNotes.includes(existingNote)) {
              state.selectedNote = favoriteNotes[0] || null
            }

            break

          case tab === 'NoteMenuBar':
            state.selectedNote.favorite = !state.selectedNote.favorite
        }
      }

      localStorage.setItem('notes', JSON.stringify({ ...state }))
    },
    toggleTrash: (state: NoteState, action: PayloadAction<{ noteId: string, tab: string }>) => {
      const { noteId, tab } = action.payload
      const existingNote: Note = state.notes.find((note) => note.id === noteId)!

      existingNote.trash = !existingNote.trash
      existingNote.lastUpdated = moment().toISOString(true)

      // Set new selectedNote
      if (state.selectedNote !== null) {
        switch (true) {
          case tab === 'notes':
            const nonTrashNotes = state.notes.filter((note) => note.trash !== true)

            if (!nonTrashNotes.includes(existingNote)) {
              state.selectedNote = nonTrashNotes[0] || null
            }

            break

          case tab === 'favorites':
            const favoriteNotes = state.notes.filter((note) => note.favorite === true && note.trash !== true)

            if (!favoriteNotes.includes(existingNote)) {
              state.selectedNote = favoriteNotes[0] || null
            }

            break

          case tab === 'trash':
            const trashNotes = state.notes.filter((note) => note.trash === true)

            if (!trashNotes.includes(existingNote)) {
              state.selectedNote = trashNotes[0] || null
            }
        }
      }

      localStorage.setItem('notes', JSON.stringify({ ...state }))
    },
    deleteNote: (state: NoteState, action: PayloadAction<{ noteId: string, tab: string }>) => {
      const { noteId, tab } = action.payload

      state.notes = state.notes.filter((note) => note.id !== noteId)

      if (state.selectedNote !== null && tab === 'trash') {
        const trashNotes = state.notes.filter((note) => note.trash === true)

        state.selectedNote = trashNotes[0] || null
      }

      localStorage.setItem('notes', JSON.stringify({ ...state }))
    },
    clearTrashNotes: (state: NoteState) => {
      state.notes = state.notes.filter((note) => note.trash !== true)
      state.selectedNote = null

      localStorage.setItem('notes', JSON.stringify({ ...state }))
    },
    setNoteCategory: (state: NoteState, action: PayloadAction<{ categoryId: string | null, noteId: string }>) => {
      const { categoryId, noteId } = action.payload
      const findNote = state.notes.find((note) => note.id === noteId)

      if (findNote === undefined) return

      if (findNote.id === state.selectedNote?.id) {
        state.selectedNote.category = categoryId
      }

      findNote.category = categoryId

      localStorage.setItem('notes', JSON.stringify({ ...state }))
    },
    removeNotesCategory: (state: NoteState, action: PayloadAction<{ categoryId: string }>) => {
      const { categoryId } = action.payload

      state.notes.forEach((note) => {
        if (note.category === categoryId) {
          note.category = null
        }
      })

      localStorage.setItem('notes', JSON.stringify({ ...state }))
    },
    pruneNotes: (state: NoteState) => {
      if (state.notes.length === 0 || state.selectedNote === null) {
        return
      }

      // Delete unedited Notes
      state.notes.forEach((note) => {
        const { text } = note

        if (text === '') {
          const index: number = state.notes.indexOf(note)
          state.notes.splice(index, 1)

          if (note.id === state.selectedNote!.id) state.selectedNote = state.notes[0] || null
        }
      })

      localStorage.setItem('notes', JSON.stringify({ ...state }))
    }
  }
})

export const {
  getNotes, setSelectedNote, createNote, editNoteText, toggleFavorite, toggleTrash, deleteNote, clearTrashNotes, setNoteCategory, removeNotesCategory, pruneNotes
} = noteSlice.actions
export const selectNotes = (state: RootState) => state.notes.notes
export const selectSelectedNote = (state: RootState) => state.notes.selectedNote
export default noteSlice.reducer
