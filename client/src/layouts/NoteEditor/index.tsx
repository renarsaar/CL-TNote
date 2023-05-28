import React, { useContext, useState } from 'react'
import './style.scss'
import Previewer from '../../components/Previewer'
import Editor from '../../components/Editor'
import NoteMenuBar from '../NoteMenuBar'
import { ConfigContext } from '../../context'

type Props = {}

export default function NoteEditor({ }: Props) {
  const [data, setData] = useState<string>('');
  const { configs } = useContext(ConfigContext);
  const markdownPreview: boolean = configs.markdownPreview;

  const onChange = React.useCallback((value: string) => {
    setData(value)
  }, [])

  return (
    <div className='codemirror'>
      {markdownPreview === true
        ? <Previewer data={data} />
        : <Editor data={data} onChange={onChange} />
      }

      <NoteMenuBar />
    </div>
  )
}