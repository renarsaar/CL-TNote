import { useContext, useEffect, useRef } from 'react'
import { NoteTooltipContext } from '../../../../context/NoteTooltipContext'
import { ConfigContext } from '../../../../context'
import { ConfigContextState } from '../../../../context/types'
import { NoteTooltipOptions } from './NoteTooltipOptions/NoteTooltipOptions'
import MoveToCategorySelect from './MoveToCategorySelect'
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
  const { configs: { theme } } = useContext<ConfigContextState>(ConfigContext)
  const noteTooltipContext = useContext(NoteTooltipContext)
  const isVisible: boolean = noteId === noteTooltipContext.noteId

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

    if (ref.current && !ref.current.contains(event.target)) noteTooltipContext.clearNoteId()
  }

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <div
      style={{ visibility: isVisible ? 'visible' : 'hidden', top: tooltipY, left: tooltipX }}
      className={theme === 'light' ? 'options-context-menu' : 'options-context-menu dark-mode'}
      onClick={onClick}
      ref={ref}
    >
      <MoveToCategorySelect noteId={noteId} />

      <NoteTooltipOptions noteId={noteId} noteCategory={noteCategory} isTrash={isTrash} isFavorite={isFavorite} />
    </div>
  )
}

export default NoteTooltip