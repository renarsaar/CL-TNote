import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';
import { Note } from '../../interfaces/Note';

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
      const scratchPadNote: Note = {
        id: uuidv4(),
        category: null,
        text: '# Scratchpad\n\nThe easiest note to find.',
        favorite: false,
        created: moment().toISOString(true),
        scratchPad: true,
        lastUpdated: null
      }

      if (notes === null) {
        const newNotes: Note[] = [
          { ...scratchPadNote },
          {
            id: uuidv4(),
            category: null,
            text: 'Welcome to Takenote!\n\nTakeNote is a free, open-source notes app for the web. It is a demo project only, and does not integrate with any database or cloud. Your notes are saved in local storage and will not be permanently persisted, but are available for download.\n\nView the source on [Github](https://github.com/taniarascia/takenote).\n\n## Features\n\n- **Plain text notes** - take notes in an IDE-like environment that makes no assumptions\n- **Markdown preview** - view rendered HTML\n- **Linked notes** - use `{{uuid}}` syntax to link to notes within other notes\n- **Syntax highlighting** - light and dark mode available (based on the beautiful [New Moon theme](https://taniarascia.github.io/new-moon/))\n- **Keyboard shortcuts** - use the keyboard for all common tasks - creating notes and categories, toggling settings, and other options\n- **Drag and drop** - drag a note or multiple notes to categories, favorites, or trash\n- **Multi-cursor editing** - supports multiple cursors and other [Codemirror](https://codemirror.net/) options\n- **Search notes** - easily search all notes, or notes within a category\n- **Prettify notes** - use Prettier on the fly for your Markdown\n- **No WYSIWYG** - made for developers, by developers\n- **No database** - notes are only stored in the browser&apos;s local storage and are available for download and export to you alone\n- **No tracking or analytics** - &apos;nuff said\n- **GitHub integration** - self-hosted option is available for auto-syncing to a GitHub repository (not available in the demo)\n',
            favorite: false,
            created: moment().toISOString(true),
            lastUpdated: null
          },
          {
            id: uuidv4(),
            category: 'bfaa5cdc-283a-48ad-baa0-614fcf277fbf',
            text: 'Test note\nlorem ipsum......',
            favorite: true,
            created: moment().toISOString(true),
            lastUpdated: null
          }
        ]

        localStorage.setItem('notes', JSON.stringify({
          notes: newNotes,
          selectedNote: newNotes[1] // Todo: 0 is scratchpad. For future, notes.find -> first note not scratchpad
        }))

        return {
          ...state,
          notes: newNotes,
          selectedNote: newNotes[1]
        }
      }

      const newNotes: NoteState = JSON.parse(notes)

      const SCRATCHPAD_NOTE_EXISTS_IN_LOCAL_STORAGE: boolean = newNotes.notes.some((note) => note.scratchPad !== false)
      if (SCRATCHPAD_NOTE_EXISTS_IN_LOCAL_STORAGE !== true) {
        newNotes.notes.unshift(scratchPadNote)
        state.notes.unshift(scratchPadNote)
      }

      const SELECTED_NOTE_EXISTS_IN_LOCAL_STORAGE: boolean = newNotes.selectedNote !== null
      if (SELECTED_NOTE_EXISTS_IN_LOCAL_STORAGE !== true) {
        newNotes.selectedNote = null
        state.selectedNote = null
      }

      return {
        ...newNotes,
      }
    },
    setSelectedNote: (state: NoteState, action: PayloadAction<{ note: Note | null }>) => {
      const { note } = action.payload

      const ONLY_SCRATCHPAD_IN_NOTE_LIST: boolean = note === null
      if (ONLY_SCRATCHPAD_IN_NOTE_LIST) {
        state.selectedNote = null
        return
      }

      const IS_SAME_NOTE_SELECTED: boolean = note!.id === state.selectedNote?.id
      if (IS_SAME_NOTE_SELECTED) return

      const removeUnEditedNotes = () => {
        state.notes.map((item) => {
          const { text, scratchPad } = item

          if (scratchPad === true) return note

          if (text === '') {
            const index: number = state.notes.indexOf(item)
            state.notes.splice(index, 1)
          }

          return note
        })
      }
      removeUnEditedNotes()

      localStorage.setItem('notes', JSON.stringify({
        notes: state.notes,
        selectedNote: note
      }))

      state.selectedNote = note
    },
    createNote: (state: NoteState) => {
      const note: Note = {
        id: uuidv4(),
        category: null,
        text: '',
        favorite: false,
        created: moment().toISOString(true),
        scratchPad: false,
        lastUpdated: null
      }

      const IS_NOTE_EMPTY: boolean = state.selectedNote?.text === ''
      if (IS_NOTE_EMPTY) {
        const index: number = state.notes.indexOf(note)
        state.notes.splice(index, 1)
      }

      state.notes.push(note)
      state.selectedNote = note

      localStorage.setItem('notes', JSON.stringify({
        notes: state.notes,
        selectedNote: state.selectedNote
      }))
    },
    editNote: (state: NoteState, action: PayloadAction<{ note: Note, value: string }>) => {
      const { note, value } = action.payload
      const { id } = note
      const savedState = localStorage.getItem('notes')
      const newState: NoteState = JSON.parse(savedState!)
      const newNotes: Note[] = newState.notes
      const newSelectedNote: Note | null = newState.selectedNote
      const index: number = newNotes.findIndex((note: Note) => note.id === id)

      const editNotesText = () => {
        newNotes[index].text = value
        newSelectedNote!.text = value
      }

      const editNotesUpdateTime = () => {
        newNotes[index].lastUpdated = moment().toISOString(true)
        newSelectedNote!.lastUpdated = moment().toISOString(true)
      }

      const editState = () => {
        state.notes[index].text = value
        state.selectedNote!.text = value
      }

      editNotesText()
      editNotesUpdateTime()
      editState()

      localStorage.setItem('notes', JSON.stringify({ ...newState }))
    }
  }
})

export const { getNotes, setSelectedNote, createNote, editNote } = noteSlice.actions
export const selectNotes = (state: RootState) => state.notes.notes
export const selectSelectedNote = (state: RootState) => state.notes.selectedNote
export default noteSlice.reducer
