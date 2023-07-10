import { useContext, useEffect } from 'react'
import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { ConfigContext } from '../../context'
import { ConfigContextState } from '../../context/types'
import { BasicSetupOptions } from '../../interfaces/Configs'
import { codeMirrorTheme } from '../../utils/CodeMirrorTheme'

import './style.scss'
import { useAppDispatch } from '../../hooks/hooks'
import { editNote } from '../../store/notes/notesSlice'
import { Note } from '../../interfaces/Note'

type Props = {
  note: Note
}

export default function Editor({ note }: Props) {
  const dispatch = useAppDispatch();
  const { configs: { codeMirrorOptions } } = useContext<ConfigContextState>(ConfigContext);
  const basicSetupOptions: BasicSetupOptions = {
    lineNumbers: codeMirrorOptions.lineNUmbers,
    highlightActiveLine: codeMirrorOptions.highlightActiveLine,
    highlightActiveLineGutter: codeMirrorOptions.highlightActiveLine,
    foldGutter: false,
    indentOnInput: false,
  };

  const handleChange = (value: string) => {
    dispatch(editNote({
      note,
      value
    }))
  }

  return (
    <ReactCodeMirror
      value={note.text}
      height="calc(100vh - 2rem)"
      theme={codeMirrorTheme}
      basicSetup={basicSetupOptions}
      className='editor'
      extensions={[javascript({ jsx: true })]}
      onChange={handleChange}
    />
  )
}
