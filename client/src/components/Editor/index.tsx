import { useContext } from 'react'
import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { ConfigContext } from '../../context'
import { ConfigContextState } from '../../context/types'
import { BasicSetupOptions } from '../../interfaces/Configs'
import { codeMirrorTheme } from '../../utils/CodeMirrorTheme'

import './style.scss'

type Props = {
  data: string;
  onChange: (value: any, viewUpdate: any) => void;
}

export default function Editor({ data, onChange }: Props) {
  const { configs: { codeMirrorOptions } } = useContext<ConfigContextState>(ConfigContext);
  const lineNumbers: boolean = codeMirrorOptions.lineNumbers;
  const highlightActiveLine: boolean = codeMirrorOptions.highlightActiveLine;
  const basicSetupOptions: BasicSetupOptions = {
    lineNumbers,
    highlightActiveLine,
    highlightActiveLineGutter: highlightActiveLine
  };

  return (
    <>
      <ReactCodeMirror
        value={data}
        height="calc(100vh - 2rem)"
        theme={codeMirrorTheme}
        basicSetup={basicSetupOptions}
        className='editor'
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
    </>
  )
}
