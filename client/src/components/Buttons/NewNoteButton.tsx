import { useContext } from 'react';
import { ConfigContext } from '../../context'
import NewNoteIcon from '../Icons/NewNoteIcon';

import './style.scss'
import '../../assets/_variables.scss'
import { useAppDispatch } from '../../hooks/hooks';
import { createNote } from '../../store/notes/notesSlice';

type Props = {}

export default function NewNoteButton({ }: Props) {
  const dispatch = useAppDispatch()
  const { configs } = useContext(ConfigContext)
  const { theme } = configs

  return (
    <button
      className={theme === 'dark' ? 'new-note-button dark' : 'new-note-button'}
      onClick={() => dispatch(createNote())}
    >
      <NewNoteIcon className='new-note-button-icon' width={18} height={18} />

      <span>New note</span>
    </button>
  )
}