import { useContext } from 'react'
import './style.scss'
import Previewer from '../../components/Previewer'
import Editor from '../../components/Editor'
import NoteMenuBar from '../NoteMenuBar'
import { ConfigContext } from '../../context'
import { useAppSelector } from '../../hooks/hooks'
import { selectSelectedNote } from '../../store/notes/notesSlice'

type Props = {}

export default function NoteEditor({ }: Props) {
  const selectedNote = useAppSelector(selectSelectedNote || null);
  const { configs } = useContext(ConfigContext);
  const markdownPreview: boolean = configs.markdownPreview;

  return selectedNote !== null ? (
    <div className='codemirror'>
      {markdownPreview === true
        ? <Previewer data={selectedNote.text} />
        : <Editor note={selectedNote} />
      }

      <NoteMenuBar />
    </div>
  ) : (
    <div className='codemirror'>
      <NoteMenuBar />
    </div>
  )
}