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
      const notes = localStorage.getItem('notes')

      if (!notes) {
        const newNotes: Note[] = [{
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
          text: 'Test note made for testing\nlorem ipsum......',
          favorite: true,
          created: moment().toISOString(true),
          lastUpdated: null
        }]

        localStorage.setItem('notes', JSON.stringify({
          notes: newNotes,
          selectedNote: newNotes[0]
        }))

        return {
          ...state,
          notes: newNotes,
          selectedNote: newNotes[0]
        }
      }

      const newNotes = JSON.parse(notes)

      return {
        ...newNotes,
      }
    },
    setSelectedNote: (state: NoteState, action: PayloadAction<{ note: Note }>) => {
      const { note } = action.payload

      if (note.id === state.selectedNote?.id) return

      // Remove empty notes
      state.notes.map((n) => {
        if (n.text === '') {
          const index = state.notes.indexOf(n)
          state.notes.splice(index, 1)
        }

        return note
      })

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

      // Remove empty notes
      if (state.selectedNote?.text === '') {
        const index = state.notes.indexOf(note)
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
      const newNotes = newState.notes
      const newSelectedNote = newState.selectedNote
      const index = newNotes.findIndex((note: Note) => note.id === id)

      newNotes[index].text = value
      newSelectedNote!.text = value

      newNotes[index].lastUpdated = moment().toISOString(true)
      newSelectedNote!.lastUpdated = moment().toISOString(true)

      state.notes[index].text = value
      state.selectedNote!.text = value

      localStorage.setItem('notes', JSON.stringify({ ...newState }))
    }
  }
})

export const { getNotes, setSelectedNote, createNote, editNote } = noteSlice.actions
export const selectNotes = (state: RootState) => state.notes.notes
export const selectSelectedNote = (state: RootState) => state.notes.selectedNote
export default noteSlice.reducer