import { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { RenameCategoryContext } from '../../context/RenameCategoryContext'
import { getCategories, selectCategories, selectSelectedCategory } from '../../store/categories/categorySlice'
import { selectNotes, setSelectedNote } from '../../store/notes/notesSlice'
import { setNavigation } from '../../store/navigation/navigationSlice'
import CategoryTitle from './CategoryTitle'
import CategoryItem from './CategoryItem'
import NewCategoryForm from '../Forms/NewCategoryForm/NewCategoryForm'
import RenameCategoryForm from '../Forms/RenameCategoryForm/RenameCategoryForm'
import CategoryIcon from '../Icons/CategoryIcon'
import { Category } from '../../interfaces/Category'
import './style.scss'

const CategoryList = () => {
  const dispatch = useAppDispatch()
  const notes = useAppSelector(selectNotes)
  const categories: Category[] = useAppSelector(selectCategories)
  const selectedCategory = useAppSelector(selectSelectedCategory)
  const renameCategoryContext = useContext(RenameCategoryContext)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const toggleCollapse = () => setIsCollapsed((isCollapsed) => !isCollapsed)

  const [isNewCategoryFormOpen, setIsNewCategoryFormOpen] = useState<boolean>(false)
  const toggleNewCategoryForm = (isOpen: boolean) => setIsNewCategoryFormOpen(isOpen)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    if (selectedCategory !== null) {
      const { id, name } = selectedCategory
      const categorizedNotes = notes.filter((note) => note.category === id)

      dispatch(setSelectedNote({ note: categorizedNotes[0] }))
      dispatch(setNavigation(name))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory])

  return ((categories.length !== 0) && (isCollapsed !== true)) ? (
    <>
      <CategoryTitle
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
        toggleNewCategoryForm={toggleNewCategoryForm}
      />

      <div className='category-list'>
        {categories.map((category) =>
          renameCategoryContext.formId === category?.id
            ? (
              <div key={category.id} className='category-rename-container'>
                <CategoryIcon
                  className='app-sidebar-icon'
                  width={15}
                  height={15}
                />

                <RenameCategoryForm
                  id={category.id}
                  value={category.name}
                />
              </div>
            )
            : (
              <CategoryItem key={category.id} category={category} />
            )

        )}

        {isNewCategoryFormOpen === true && (
          <NewCategoryForm toggleNewCategoryForm={toggleNewCategoryForm} />
        )}
      </div>
    </>
  ) : (
    <CategoryTitle
      isCollapsed={isCollapsed}
      toggleCollapse={toggleCollapse}
      toggleNewCategoryForm={toggleNewCategoryForm}
    />
  )
}

export default CategoryList
