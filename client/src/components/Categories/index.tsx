import CategoryTitle from './CategoryTitle';
import CategoryIcon from '../Icons/CategoryIcon';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getCategories, selectCategories } from '../../store/categories/categorySlice';
import { useEffect } from 'react';

const Categories = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <>
      <CategoryTitle />

      <div className='category-list'>
        {categories.map((category) => (
          <div
            key={category.id}
            tabIndex={0}
            role="button"
            draggable="false"
            className="category-list-item"
          >
            <div className="category-list-name">
              <CategoryIcon className='app-sidebar-icon' width={15} height={15} />

              {category.name}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Categories
