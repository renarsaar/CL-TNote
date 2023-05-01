import ScratchpadIcon from '../../components/Icons/ScratchpadIcon';
import FavoritesIcon from '../../components/Icons/FavoritesIcon';
import TrashIcon from '../../components/Icons/TrashIcon';
import DownloadNoteIcon from '../../components/Icons/DownloadNoteIcon';
import ClipboardIcon from '../../components/Icons/ClipboardIcon';
import LastSynced from '../../components/LastSynced';
import SyncNotesIcon from '../../components/Icons/SyncNotesIcon';
import ConfigsIcon from '../../components/Icons/ConfigsIcon';
import DarkModeIcon from '../../components/Icons/DarkModeIcon';

import './style.scss';

type Props = {}

export default function NoteMenuBar({ }: Props) {
  const togglePreview = () => {
    console.log('togglePreview');
  }

  return (
    <div className='note-menu-bar'>
      <nav>
        <button className='note-menu-bar-button'>
          <ScratchpadIcon className='note-menu-bar-icon' width={20} height={20} />
        </button>

        <button className='note-menu-bar-button'>
          <FavoritesIcon className='note-menu-bar-icon' width={20} height={20} />
        </button>

        <button className='note-menu-bar-button'>
          <TrashIcon className='note-menu-bar-icon' width={20} height={20} />
        </button>

        <button className='note-menu-bar-button'>
          <DownloadNoteIcon className='note-menu-bar-icon' width={20} height={20} />
        </button>

        <button className='note-menu-bar-button'>
          <ClipboardIcon className='note-menu-bar-icon' width={20} height={20} />
        </button>
      </nav>

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
    </div>
  )
}