import FavoritesIcon from '../../Icons/FavoritesIcon'
import OptionsIcon from '../../Icons/OptionsIcon'
import NoteIcon from '../../Icons/NoteIcon'
import CategoryIcon from '../../Icons/CategoryIcon'
import './style.scss'

type Props = {
  note: string;
}

// Todo: Style Notelist, make sure Icons are in the right color
// Todo: Different svg icon based on if the note is included in category or note -> Conditional needed
// Todo: FavoritesIcon icon classname must be changed from app-sidebar-icon to ......
// ? Q: Why doesn't Options Icon have a wrapper class

export default function index({ note }: Props) {
  return (
    <div className="note-list-item">
      <div className="note-list-outer">
        <div className="note-title">
          <div className="icon">
            <FavoritesIcon />
          </div>

          <div className="truncate-text">{note}</div>
        </div>

        <div className="note-options">
          <OptionsIcon />

          <span className="sr-only"></span>
        </div>
      </div>

      <div className="note-category">
        <NoteIcon />
        {/* <CategoryIcon /> */}
        {/* Conditional if the Note is included in any of the categories or not */}

        New Note
      </div>
    </div>
  )
}