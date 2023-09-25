import MarkdownPreview from '@uiw/react-markdown-preview'

import './style.scss'

type Props = {
  text: string;
}

export default function Previewer({ text }: Props) {
  return (
    <MarkdownPreview source={text} className='previewer' />
  )
}