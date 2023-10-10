import { useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectCategories, setSelectedCategory } from '../../../../../store/categories/categorySlice';
import { selectNavigation, setNavigation } from '../../../../../store/navigation/navigationSlice';
import { selectNotes, setNoteCategory } from '../../../../../store/notes/notesSlice';
import { ActiveNoteTooltipContext } from '../../../../../context/ActiveNoteTooltipContext';
import './style.scss'

type Props = {
  noteId: string
}

const MoveToCategorySelect = ({ noteId }: Props) => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)
  const { tab } = useAppSelector(selectNavigation)
  const { clearActiveNoteId } = useContext(ActiveNoteTooltipContext)
  const notes = useAppSelector(selectNotes)
  const findNote = notes.find((note) => note.id === noteId)

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const select = event.target
    const { value } = event.target
    const id = select.children[select.selectedIndex].id

    if (value === 'Move to category...') return

    dispatch(setNoteCategory({ categoryId: id, noteId }))

    const findCategory = categories.find((category) => category.id === id)
    dispatch(setSelectedCategory({ category: findCategory }))

    dispatch(setNavigation(value))

    clearActiveNoteId()
  }

  return tab !== 'trash' ? (
    <select
      className='move-to-category-select'
      defaultValue='Move to category...'
      onChange={onChange}
    >
      <option value='Move to category...'>Move to category...</option>

      {categories.map(
        (category) => {
          return findNote?.category === category.id ? null : (
            <option key={category.id} id={category.id} value={category.name}>
              {category.name}
            </option>
          )
        }
      )}
    </select>
  ) : null
}

export default MoveToCategorySelect