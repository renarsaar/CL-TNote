import { useContext, useEffect, useRef } from 'react'
import { ActiveTooltipContext } from '../../../context/ActiveTooltipContext'
import MoveToCategorySelect from './MoveToCategorySelect'
import { NoteTooltipOptions } from './NoteTooltipOptions/NoteTooltipOptions'
import './style.scss'

type Props = {
  noteId: string
  isTrash: boolean
  isFavorite: boolean
}

const NoteTooltip = ({ noteId, isTrash, isFavorite }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { activeNoteId, clearActiveNoteId } = useContext(ActiveTooltipContext)
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
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      className='options-context-menu'
      onClick={onClick}
      ref={ref}
    >
      <MoveToCategorySelect />

      <NoteTooltipOptions noteId={noteId} isTrash={isTrash} isFavorite={isFavorite} />
    </div>
  )
}

export default NoteTooltip