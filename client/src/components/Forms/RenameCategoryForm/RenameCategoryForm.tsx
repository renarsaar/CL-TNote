import { useContext } from 'react'
import { editCategory } from '../../../store/categories/categorySlice'
import { useAppDispatch } from '../../../hooks/hooks'
import { RenameCategoryContext } from '../../../context/RenameCategoryContext'
import '../style.scss'

type Props = {
  id: string
  value: string
}

const RenameCategoryForm = ({ id, value }: Props) => {
  const dispatch = useAppDispatch()
  const renameCategoryContext = useContext(RenameCategoryContext)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.target as typeof event.target & {
      category: { value: string }
    }
    const newValue = formElement.category.value

    dispatch(editCategory({ categoryId: id, value: newValue }))

    renameCategoryContext.clearFormId()
  }

  const onBlur = () => {
    renameCategoryContext.clearFormId()
  }

  return (
    <form
      className='category-form-rename'
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