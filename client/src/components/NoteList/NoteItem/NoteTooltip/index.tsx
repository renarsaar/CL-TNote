import { useContext, useEffect, useRef } from 'react'
import { ActiveNoteTooltipContext } from '../../../../context/ActiveNoteTooltipContext'
import MoveToCategorySelect from './MoveToCategorySelect'
import { NoteTooltipOptions } from './NoteTooltipOptions/NoteTooltipOptions'
import './style.scss'

type Props = {
  noteId: string
  noteCategory: string | null
  isTrash: boolean
  isFavorite: boolean
  tooltipX: number
  tooltipY: number
}

const NoteTooltip = ({ noteId, noteCategory, isTrash, isFavorite, tooltipX, tooltipY }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { activeNoteId, clearActiveNoteId } = useContext(ActiveNoteTooltipContext)
  const isVisible: boolean = noteId === activeNoteId

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [isVisible])

  const handleClickOutside = (event: any) => {
    if (isVisible !== true) return
    if (
      (event.target as Element).id === 'note-options' ||
      (event.target as Element).id === 'note-options-ellips-icon'
    ) return

    if (ref.current && !ref.current.contains(event.target)) clearActiveNoteId()
  }

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <div
      style={{ visibility: isVisible ? 'visible' : 'hidden', top: tooltipY, left: tooltipX }}
      className='options-context-menu'
      onClick={onClick}
      ref={ref}
    >
      <MoveToCategorySelect noteId={noteId} />

      <NoteTooltipOptions noteId={noteId} noteCategory={noteCategory} isTrash={isTrash} isFavorite={isFavorite} />
    </div>
  )
}

export default NoteTooltip