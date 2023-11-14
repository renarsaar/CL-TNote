import CollapseIcon from '../../Icons/CollapseIcon'
import AddCategoryIcon from '../../Icons/AddCategoryIcon'
import './style.scss'

type Props = {
  isCollapsed: boolean,
  toggleCollapse: () => void,
  toggleNewCategoryForm: (isOpen: boolean) => void
}

const CategoryTitle = ({ isCollapsed, toggleCollapse, toggleNewCategoryForm }: Props) => {
  const addNewCategory = () => toggleNewCategoryForm(true)

  return (
    <div className='category-title'>
      <button className='collapse-btn' onClick={toggleCollapse}>
        <CollapseIcon
          isCollapsed={isCollapsed}
          className='app-sidebar-icon'
          width={16}
          height={16}
        />

        <h2 className='title'>Categories</h2>
      </button>

      <button className='add-category-btn' onClick={addNewCategory}>
        <AddCategoryIcon
          className='app-sidebar-icon'
          width={16}
          height={16}
        />
      </button>
    </div>
  )
}

export default CategoryTitle