import { useContext } from 'react'
import { ConfigContext } from '../../../context'
import ScratchpadIcon from '../../../components/Icons/ScratchpadIcon'
import PreviewerIcon from '../../../components/Icons/PreviewerIcon'
import FavoritesIcon from '../../../components/Icons/FavoritesIcon'
import TrashIcon from '../../../components/Icons/TrashIcon'
import DownloadNoteIcon from '../../../components/Icons/DownloadNoteIcon'
import ClipboardIcon from '../../../components/Icons/ClipboardIcon'

type Props = {}

export default function NavFunctions({ }: Props) {
  const { configs, addConfig } = useContext(ConfigContext)
  const markdownPreview: boolean = configs.markdownPreview;

  const toggleMarkdownPreview = () => {
    addConfig(configs, {
      'key': 'markdownPreview',
      'value': !markdownPreview
    })
  }

  return (
    <nav>
      <button className='note-menu-bar-button' onClick={toggleMarkdownPreview}>
        {markdownPreview === true
          ? <ScratchpadIcon className='note-menu-bar-icon' width={20} height={20} />
          : <PreviewerIcon className='note-menu-bar-icon' width={20} height={20} />
        }
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
  )
}