import NavFunctions from './NavFunctions'
import NavOptions from './NavOptions'

import './style.scss';

type Props = {}

export default function NoteMenuBar({ }: Props) {
  return (
    <div className='note-menu-bar'>
      <NavFunctions />

      <NavOptions />
    </div>
  )
}