import ConfigsIcon from '../../../components/Icons/ConfigsIcon'
import DarkModeIcon from '../../../components/Icons/DarkModeIcon'
import SyncNotesIcon from '../../../components/Icons/SyncNotesIcon'
import LastSynced from '../../../components/LastSynced'

type Props = {}

export default function NavOptions({ }: Props) {
  return (
    <nav>
      <LastSynced />

      <button className='note-menu-bar-button'>
        <SyncNotesIcon className='note-menu-bar-icon' width={20} height={20} />
      </button>

      <button className='note-menu-bar-button'>
        <DarkModeIcon className='note-menu-bar-icon' width={20} height={20} />
      </button>

      <button className='note-menu-bar-button'>
        <ConfigsIcon className='note-menu-bar-icon' width={20} height={20} />
      </button>
    </nav>
  )
}