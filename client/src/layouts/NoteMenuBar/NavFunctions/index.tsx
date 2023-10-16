import { useContext } from 'react'
import { ConfigContext } from '../../../context'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { deleteNote, selectSelectedNote, setSelectedNote, toggleFavorite, toggleTrash } from '../../../store/notes/notesSlice'
import { selectNavigation } from '../../../store/navigation/navigationSlice'
import ScratchpadIcon from '../../../components/Icons/ScratchpadIcon'
import PreviewerIcon from '../../../components/Icons/PreviewerIcon'
import FavoritesIcon from '../../../components/Icons/FavoritesIcon'
import TrashIcon from '../../../components/Icons/TrashIcon'
import DownloadNoteIcon from '../../../components/Icons/DownloadNoteIcon'
import ClipboardIcon from '../../../components/Icons/ClipboardIcon'

type Props = {}

export default function NavFunctions({ }: Props) {
  const dispatch = useAppDispatch()
  const selectedNote = useAppSelector(selectSelectedNote)
  const { tab } = useAppSelector(selectNavigation)
  const { configs, addConfig } = useContext(ConfigContext)
  const markdownPreview: boolean = configs.markdownPreview;

  const toggleMarkdownPreview = () => {
    addConfig(configs, {
      'key': 'markdownPreview',
      'value': !markdownPreview
    })
  }

  const markAsFavorite = () => {
    if (selectedNote === null) return

    dispatch(toggleFavorite({ noteId: selectedNote?.id, tab: 'NoteMenuBar' }))
  }

  const moveToTrash = () => {
    if (selectedNote === null) return

    tab === 'trash'
      ? dispatch(deleteNote({ noteId: selectedNote?.id, tab }))
      : dispatch(toggleTrash({ noteId: selectedNote?.id, tab }))
  }

  return (
    <nav>
      <button className='note-menu-bar-button' onClick={toggleMarkdownPreview}>
        {markdownPreview === true
          ? <ScratchpadIcon className='note-menu-bar-icon' width={18} height={18} />
          : <PreviewerIcon className='note-menu-bar-icon' width={18} height={18} />
        }
      </button>

      <button className='note-menu-bar-button' onClick={markAsFavorite}>
        <FavoritesIcon
          className={selectedNote?.favorite === true ? 'note-menu-bar-icon-favorited' : 'note-menu-bar-icon'}
          width={18}
          height={18}
        />
      </button>

      <button className='note-menu-bar-button' onClick={moveToTrash}>
        <TrashIcon className='note-menu-bar-icon trash' width={18} height={18} />
      </button>

      <button className='note-menu-bar-button'>
        <DownloadNoteIcon className='note-menu-bar-icon' width={18} height={18} />
      </button>

      <button className='note-menu-bar-button'>
        <ClipboardIcon className='note-menu-bar-icon' width={18} height={18} />
      </button>
    </nav>
  )
}