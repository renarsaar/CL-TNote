import { useContext, useState } from 'react'
import { CategoryTooltipContext } from '../../../context/CategoryTooltipContext'
import { Category } from '../../../interfaces/Category'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { setNavigation } from '../../../store/navigation/navigationSlice'
import { selectSelectedCategory, setSelectedCategory } from '../../../store/categories/categorySlice'
import { selectNotes, setSelectedNote } from '../../../store/notes/notesSlice'
import CategoryTooltip from '../CategoryTooltip'
import CategoryIcon from '../../Icons/CategoryIcon'
import NoteOptionsIcon from '../../Icons/NoteOptionsIcon'
import './style.scss'

type Props = {
  category: Category
}

const CategoryItem = ({ category }: Props) => {
  const dispatch = useAppDispatch()
  const { id, name } = category
  const categoryTooltipContext = useContext(CategoryTooltipContext)
  const selectedCategory = useAppSelector(selectSelectedCategory)
  const notes = useAppSelector(selectNotes)
  const isCategorySelected: boolean = id === selectedCategory?.id
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)

  const handleOnCategoryClick = () => {
    dispatch(setSelectedCategory({ category }))
    dispatch(setNavigation(category.name))

    const categorizedNotes = notes.filter((note) => note.category === category.id)
    dispatch(setSelectedNote({ note: categorizedNotes[0] }))
  }

  const handleOnOptionsClick = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation()

    categoryTooltipContext.setCategoryId(category.id)

    setTooltipX(() => event.clientX)
    setTooltipY(() => event.clientY)
  }

  return (
    <>
      <div
        key={id}
        tabIndex={0}
        role='button'
        draggable='false'
        className={isCategorySelected ? 'category-list-item-active' : 'category-list-item'}
        onClick={handleOnCategoryClick}
      >
        <div className='category-name'>
          <CategoryIcon className='app-sidebar-icon' width={15} height={15} />

          {name}
        </div>

        <NoteOptionsIcon
          className='app-sidebar-context-icon'
          width={15}
          height={15}
          onClick={handleOnOptionsClick}
        />
      </div>

      <CategoryTooltip categoryId={id} tooltipX={tooltipX} tooltipY={tooltipY} />
    </>
  )
}

export default CategoryItem