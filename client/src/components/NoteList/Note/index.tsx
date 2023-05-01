import FavoritesIcon from '../../Icons/FavoritesIcon'
import OptionsIcon from '../../Icons/OptionsIcon'
import NoteIcon from '../../Icons/NoteIcon'
import CategoryIcon from '../../Icons/CategoryIcon'
import './style.scss'

type Props = {
  note: string;
}

export default function index({ note }: Props) {
  return (
    <div className="note-list-item">
      <div className="note-list-outer">
        <div className="note-title">
          <div className="icon">
            <FavoritesIcon className='note-sidebar-favorites-icon' width={15} height={15} />
          </div>

          <div className="truncate-text">{note}</div>
        </div>

        <div className="note-options">
          <OptionsIcon />

          <span className="sr-only"></span>
        </div>
      </div>

      <div className="note-category">
        <NoteIcon className='note-sidebar-icon' width={15} height={15} />
        {/* <CategoryIcon /> */}

        New Note
      </div>
    </div>
  )
}