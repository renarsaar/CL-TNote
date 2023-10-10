import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { ActiveCategoryRenameFormContext } from '../../context/ActiveCategoryRenameFormContext'
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
  const { activeCategoryFormId } = useContext(ActiveCategoryRenameFormContext)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const handleIsCollapsed = () => setIsCollapsed((isCollapsed) => !isCollapsed)
  const [openNewCategoryForm, setOpenNewCategoryForm] = useState<boolean>(false)
  const openCategoryForm = () => setOpenNewCategoryForm(() => true)
  const closeCategoryForm = () => setOpenNewCategoryForm(() => false)

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
  }, [selectedCategory])

  return ((categories.length !== 0) && (isCollapsed !== true)) ? (
    <>
      <CategoryTitle isCollapsed={isCollapsed} handleIsCollapsed={handleIsCollapsed} openCategoryForm={openCategoryForm} />

      <div className='category-list'>
        {categories.map((category) => {
          return activeCategoryFormId === category?.id
            ? (
              <React.Fragment key={category.id}>
                <div className='category-list-form-name'>
                  <CategoryIcon className='app-sidebar-icon' width={15} height={15} />

                  <RenameCategoryForm
                    id={category.id}
                    value={category.name}
                    className={'category-form-rename'}
                  />
                </div>
              </React.Fragment>
            )
            : (
              <CategoryItem
                key={category.id}
                category={category}
              />
            )
        })}

        {openNewCategoryForm === true && <NewCategoryForm className={'category-form'} closeCategoryForm={closeCategoryForm} />}
      </div>
    </>
  ) : <CategoryTitle isCollapsed={isCollapsed} handleIsCollapsed={handleIsCollapsed} openCategoryForm={openCategoryForm} />
}

export default CategoryList
