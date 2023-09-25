import { useContext } from 'react'
import { ActiveTooltipContext } from '../../../../context/ActiveTooltipContext'
import NoteOptionsIcon from '../../../Icons/NoteOptionsIcon'
import NoteTooltip from '../../NoteTooltip'
import './style.scss'

type Props = {
  noteId: string
  isTrash: boolean
  isFavorite: boolean
  selectedNoteId: string
}

const NoteOptions = ({ noteId, selectedNoteId, isTrash, isFavorite }: Props) => {
  const { setActiveNoteId } = useContext(ActiveTooltipContext)
  const isNoteSelected: boolean = noteId === selectedNoteId

  const handleOnOptionsClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation()

    setActiveNoteId(noteId)
  }

  return (
    <div className="note-options" id='note-options'>
      <NoteOptionsIcon
        className={isNoteSelected ? 'note-sidebar-icon-active' : 'note-sidebar-icon'}
        width={15}
        height={15}
        onClick={(e) => handleOnOptionsClick(e)}
      />

      <NoteTooltip noteId={noteId} isTrash={isTrash} isFavorite={isFavorite} />
    </div>
  )
}

export default NoteOptions