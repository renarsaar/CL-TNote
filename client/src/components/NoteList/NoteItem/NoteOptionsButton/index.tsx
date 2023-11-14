import { useContext } from 'react'
import { NoteTooltipContext } from '../../../../context/NoteTooltipContext'
import NoteOptionsIcon from '../../../Icons/NoteOptionsIcon'
import './style.scss'

type Props = {
  noteId: string
  selectedNoteId: string
  setTooltipX: (clientX: number) => void
  setTooltipY: (clientY: number) => void
}

const NoteOptionsButton = ({ noteId, selectedNoteId, setTooltipX, setTooltipY }: Props) => {
  const noteTooltipContext = useContext(NoteTooltipContext)
  const isNoteSelected: boolean = noteId === selectedNoteId

  const handleOnClick = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation()

    noteTooltipContext.setNoteId(noteId)
    setTooltipX(event.clientX)
    setTooltipY(event.clientY)
  }

  return (
    <div className="note-options-button" id='note-options-button'>
      <NoteOptionsIcon
        className={isNoteSelected ? 'note-sidebar-icon-active' : 'note-sidebar-icon'}
        width={15}
        height={15}
        onClick={handleOnClick}
      />
    </div>
  )
}

export default NoteOptionsButton