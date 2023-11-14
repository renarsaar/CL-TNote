import { useContext } from 'react'
import { createCategory } from '../../../store/categories/categorySlice'
import { useAppDispatch } from '../../../hooks/hooks'
import { RenameCategoryContext } from '../../../context/RenameCategoryContext'
import '../style.scss'

type Props = {
  toggleNewCategoryForm: (isOpen: boolean) => void
}

const NewCategoryForm = ({ toggleNewCategoryForm }: Props) => {
  const dispatch = useAppDispatch()
  const renameCategoryContext = useContext(RenameCategoryContext)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.target as typeof event.target & {
      category: { value: string }
    }
    const { value } = formElement.category

    dispatch(createCategory({ value }))

    renameCategoryContext.clearFormId()
    toggleNewCategoryForm(false)
  }

  const onBlur = () => {
    renameCategoryContext.clearFormId()
    toggleNewCategoryForm(false)
  }

  return (
    <form
      className='category-form-add'
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