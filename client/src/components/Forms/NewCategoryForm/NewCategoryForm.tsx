import { useContext } from 'react'
import { createCategory } from '../../../store/categories/categorySlice'
import { useAppDispatch } from '../../../hooks/hooks'
import { ActiveCategoryRenameFormContext } from '../../../context/ActiveCategoryRenameFormContext'
import '../style.scss'

type Props = {
  className: 'category-form',
  closeCategoryForm: () => void
}

const NewCategoryForm = ({ className, closeCategoryForm }: Props) => {
  const dispatch = useAppDispatch()
  const { clearActiveCategoryFormId } = useContext(ActiveCategoryRenameFormContext)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.target as typeof event.target & {
      category: { value: string }
    }
    const { value } = formElement.category

    dispatch(createCategory({ value }))

    clearActiveCategoryFormId()
    closeCategoryForm()
  }

  const onBlur = () => {
    clearActiveCategoryFormId()
    closeCategoryForm()
  }

  return (
    <form
      className={className}
      onSubmit={onSubmit}
      onBlur={onBlur}
    >
      <input
        type='text'
        autoFocus
        name='category'
        placeholder='New category...'
      />
    </form>
  )
}

export default NewCategoryForm