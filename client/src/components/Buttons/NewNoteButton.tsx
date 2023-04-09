import { useContext } from 'react';
import { ConfigContext } from '../../context'
import NewNoteIcon from '../Icons/NewNoteIcon';

import './style.scss'
import '../../assets/_variables.scss'

type Props = {}

export default function NewNoteButton({ }: Props) {
  const { configs } = useContext(ConfigContext);
  const { theme } = configs;

  return (
    <button className={theme === 'dark' ? 'action-button dark' : 'action-button'}>
      <NewNoteIcon />

      <span>New note</span>
    </button>
  )
}