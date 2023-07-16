import { useContext } from 'react'
import Previewer from '../../components/Previewer'
import Editor from '../../components/Editor'
import NoteMenuBar from '../NoteMenuBar'
import { ConfigContext } from '../../context'
import { useAppSelector } from '../../hooks/hooks'
import { selectSelectedNote } from '../../store/notes/notesSlice'
import EmptyNote from '../../components/EmptyNote'
import './style.scss'

export default function NoteEditor() {
  const selectedNote = useAppSelector(selectSelectedNote || null);
  const { configs } = useContext(ConfigContext);
  const markdownPreview: boolean = configs.markdownPreview;

  return selectedNote !== null ? (
    <div className='codemirror'>
      {markdownPreview === true
        ? <Previewer data={selectedNote.text} />
        : <Editor noteId={selectedNote.id} text={selectedNote.text} />
      }

      <NoteMenuBar />
    </div>
  ) : (
    <div className='codemirror'>
      <EmptyNote />

      <NoteMenuBar />
    </div>
  )
}