import { useContext } from 'react'
import { editCategory } from '../../../store/categories/categorySlice'
import { useAppDispatch } from '../../../hooks/hooks'
import { ActiveCategoryRenameFormContext } from '../../../context/ActiveCategoryRenameFormContext'
import '../style.scss'

type Props = {
  id: string
  value: string
  className: 'category-form-rename'
}

const RenameCategoryForm = ({ id, value, className }: Props) => {
  const dispatch = useAppDispatch()
  const { clearActiveCategoryFormId } = useContext(ActiveCategoryRenameFormContext)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.target as typeof event.target & {
      category: { value: string }
    }
    const newValue = formElement.category.value

    dispatch(editCategory({ categoryId: id, value: newValue }))

    clearActiveCategoryFormId()
  }

  const onBlur = () => {
    clearActiveCategoryFormId()
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
        defaultValue={value}
        name='category'
      />
    </form>
  )
}

export default RenameCategoryForm