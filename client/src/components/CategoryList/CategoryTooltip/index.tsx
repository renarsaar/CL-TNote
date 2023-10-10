import { useContext, useEffect, useRef } from 'react'
import { useAppDispatch } from '../../../hooks/hooks'
import { removeNotesCategory } from '../../../store/notes/notesSlice'
import { deleteCategory } from '../../../store/categories/categorySlice'
import { ActiveCategoryTooltipContext } from '../../../context/ActiveCategoryTooltipContext'
import { ActiveCategoryRenameFormContext } from '../../../context/ActiveCategoryRenameFormContext'
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
  const { activeCategoryId, clearActiveCategoryId } = useContext(ActiveCategoryTooltipContext)
  const { setActiveCategoryFormId } = useContext(ActiveCategoryRenameFormContext)
  const isVisible: boolean = categoryId === activeCategoryId

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [isVisible])

  const handleClickOutside = (event: any) => {
    if (isVisible !== true) return
    if (
      (event.target as Element).id === 'category-options-container' ||
      (event.target as Element).id === 'app-sidebar-context-icon'
    ) return

    if (ref.current && !ref.current.contains(event.target)) clearActiveCategoryId()
  }

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const renameCategory = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    setActiveCategoryFormId(categoryId)
    clearActiveCategoryId()
  }

  const deletePermanently = () => {
    dispatch(deleteCategory({ id: categoryId }))
    dispatch(removeNotesCategory({ categoryId }))
    clearActiveCategoryId()
  }

  return (
    <div
      className='category-tooltip'
      style={{ visibility: isVisible ? 'visible' : 'hidden', top: tooltipY, left: tooltipX }}
      onClick={onClick}
      ref={ref}
    >
      <nav className='category-tooltip-nav'>
        <div
          role='button'
          className='category-tooltip-nav-button'
          onClick={renameCategory}
        >
          <PencilIcon className='options-context-icon' width={18} height={18} />

          Rename category
        </div>

        <div
          role='button'
          className='category-tooltip-nav-button trash'
          onClick={deletePermanently}
        >
          <DeleteIcon className='options-context-icon' width={18} height={18} />

          Delete permanently
        </div>
      </nav>
    </div>
  )
}

export default CategoryTooltip