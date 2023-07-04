import MarkdownPreview from '@uiw/react-markdown-preview'

import './style.scss'

type Props = {
  data: string;
}

export default function Previewer({ data }: Props) {
  return (
    <MarkdownPreview source={data} className='previewer' />
  )
}