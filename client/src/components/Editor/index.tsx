import ReactCodeMirror from '@uiw/react-codemirror'
import { useContext } from 'react'
import { javascript } from '@codemirror/lang-javascript'
import { githubLight } from '@uiw/codemirror-theme-github'
import { materialDark } from '@uiw/codemirror-theme-material'
import { useAppDispatch } from '../../hooks/hooks'
import { ConfigContext } from '../../context'
import { ConfigContextState } from '../../context/types'
import { editNoteText } from '../../store/notes/notesSlice'
import { editScratchpad } from '../../store/scratchpad/scratchpadSlice'
// import { codeMirrorLightTheme, codeMirrorDarkTheme } from '../../utils/CodeMirrorTheme'
import { BasicSetupOptions } from '../../interfaces/Configs'
import './style.scss'

type Props = {
  noteId: string,
  text: string,
  scratchpad?: boolean,
}

const Editor = ({ noteId, text, scratchpad }: Props) => {
  const dispatch = useAppDispatch()
  const { configs: { codeMirrorOptions, theme } } = useContext<ConfigContextState>(ConfigContext)
  const basicSetupOptions: BasicSetupOptions = {
    lineNumbers: codeMirrorOptions.lineNumbers,
    highlightActiveLine: codeMirrorOptions.highlightActiveLine,
    highlightActiveLineGutter: codeMirrorOptions.highlightActiveLine,
    foldGutter: false,
    indentOnInput: false,
  }

  const handleChange = (value: string) => {
    scratchpad === true
      ? dispatch(editScratchpad({ value }))
      : dispatch(editNoteText({ noteId, value }))
  }

  return (
    <ReactCodeMirror
      value={text}
      height="calc(100vh - 2rem)"
      style={{ direction: codeMirrorOptions.textDirection }}
      // theme={theme === 'light' ? codeMirrorLightTheme : codeMirrorDarkTheme}
      theme={theme === 'light' ? githubLight : materialDark}
      basicSetup={basicSetupOptions}
      className={codeMirrorOptions.scrollPastEnd ? 'editor editor-extended' : 'editor'}
      extensions={[javascript({ jsx: true })]}
      onChange={handleChange}
    />
  )
}

export default Editor