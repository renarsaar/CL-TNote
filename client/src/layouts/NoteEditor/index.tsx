import { useState } from 'react'
import './style.scss'
import Previewer from '../../components/Previewer';
import Editor from '../../components/Editor';
import NoteMenuBar from '../NoteMenuBar';

type Props = {}

export default function NoteEditor({ }: Props) {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  return (
    <div className='codemirror'>
      {showPreview ? <Previewer /> : <Editor />}

      <NoteMenuBar />
    </div>
  )
}