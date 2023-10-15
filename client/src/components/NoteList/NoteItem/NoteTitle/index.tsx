import { useContext, useEffect, useState } from 'react'
import { useAppSelector } from '../../../../hooks/hooks'
import { SearchContext } from '../../../../context/SearchContext'
import { selectSelectedNote } from '../../../../store/notes/notesSlice'
import './style.scss'

type Props = {
  noteId: string
  text: string
}

const NoteTitle = ({ noteId, text }: Props) => {
  const selectedNote = useAppSelector(selectSelectedNote)
  const { searchTerm } = useContext(SearchContext)
  const [parts, setParts] = useState<string[]>()

  useEffect(() => {
    let title: string = text
    title = title.split('\n')[0]
    title = title.split('#')[0]
    title = title.substring(0, 40)

    if (title.trim().length === 0) {
      setParts(['New note'])
      return
    }

    setParts(title.split(new RegExp(`(${searchTerm})`, 'gi')))
  }, [text, searchTerm])

  return (
    <div className="truncate-text">
      {
        parts?.map((part, i) => (
          <span
            key={i}
            className={
              part.toLowerCase() === searchTerm.toLowerCase() && noteId === selectedNote?.id
                ? 'char-highlighted-selectedNote'
                : part.toLowerCase() === searchTerm.toLowerCase() && noteId !== selectedNote?.id
                  ? 'char-highlighted'
                  : ''
            }
          >
            {part}
          </span>
        ))
      }
    </div>
  )
}

export default NoteTitle