import { useContext, useEffect, useRef } from 'react'
import { useAppDispatch } from '../../../hooks/hooks'
import { removeNotesCategory } from '../../../store/notes/notesSlice'
import { deleteCategory } from '../../../store/categories/categorySlice'
import { CategoryTooltipContext } from '../../../context/CategoryTooltipContext'
import { RenameCategoryContext } from '../../../context/RenameCategoryContext'
import DeleteIcon from '../../Icons/DeleteIcon'
import PencilIcon from '../../Icons/PencilIcon'
import './style.scss'

type Props = {
  categoryId: string
  tooltipX: number
  tooltipY: number
}

const CategoryTooltip = ({ categoryId, tooltipX, tooltipY }: Props) => {
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLDivElement>(null)
  const categoryTooltipContext = useContext(CategoryTooltipContext)
  const renameCategoryContext = useContext(RenameCategoryContext)
  const isVisible: boolean = categoryId === categoryTooltipContext.categoryId

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [isVisible])

  const handleClickOutside = (event: any) => {
    if (isVisible !== true) return
    if (
      (event.target as Element).id === 'category-options-container' ||
      (event.target as Element).id === 'app-sidebar-context-icon'
    ) return

    if (ref.current && !ref.current.contains(event.target)) categoryTooltipContext.clearCategoryId()
  }

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const renameCategory = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    renameCategoryContext.setFormId(categoryId)
    categoryTooltipContext.clearCategoryId()
  }

  const deletePermanently = () => {
    dispatch(deleteCategory({ id: categoryId }))
    dispatch(removeNotesCategory({ categoryId }))
    categoryTooltipContext.clearCategoryId()
  }

  return (
    <div
      className='category-tooltip'
      style={{ visibility: isVisible ? 'visible' : 'hidden', top: tooltipY, left: tooltipX }}
      onClick={onClick}
      ref={ref}
    >
      <div
        role='button'
        className='category-tooltip-btn'
        onClick={renameCategory}
      >
        <PencilIcon className='options-context-icon' width={18} height={18} />

        Rename category
      </div>

      <div
        role='button'
        className='category-tooltip-btn trash'
        onClick={deletePermanently}
      >
        <DeleteIcon className='options-context-icon' width={18} height={18} />

        Delete permanently
      </div>
    </div>
  )
}

export default CategoryTooltip