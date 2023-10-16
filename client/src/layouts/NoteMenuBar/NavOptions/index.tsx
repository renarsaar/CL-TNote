import ConfigsModal from '../../../components/ConfigsModal'
import useModal from '../../../hooks/useModal'

import ConfigsIcon from '../../../components/Icons/ConfigsIcon'
import DarkModeIcon from '../../../components/Icons/DarkModeIcon'
import SyncNotesIcon from '../../../components/Icons/SyncNotesIcon'
import LastSynced from '../../../components/LastSynced'

type Props = {}

export default function NavOptions({ }: Props) {
  const { isShowing, toggle } = useModal();

  return (
    <nav>
      <LastSynced />

      <button className='note-menu-bar-button'>
        <SyncNotesIcon className='note-menu-bar-icon' width={18} height={18} />
      </button>

      <button className='note-menu-bar-button'>
        <DarkModeIcon className='note-menu-bar-icon' width={18} height={18} />
      </button>

      <button className='note-menu-bar-button' onClick={toggle}>
        <ConfigsIcon className='note-menu-bar-icon' width={18} height={18} />
        <ConfigsModal isShowing={isShowing} hide={toggle} />
      </button>
    </nav>
  )
}