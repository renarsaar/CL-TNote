import CollapseIcon from '../../Icons/CollapseIcon'
import AddCategoryIcon from '../../Icons/AddCategoryIcon'
import '../style.scss'

type Props = {
  isCollapsed: boolean,
  handleIsCollapsed: () => void,
  openCategoryForm: () => void
}

const CategoryTitle = ({ isCollapsed, handleIsCollapsed, openCategoryForm }: Props) => {
  return (
    <div className='category-title'>
      <button className='collapse-button' onClick={handleIsCollapsed}>
        <CollapseIcon isCollapsed={isCollapsed} className='app-sidebar-icon' width={16} height={16} />

        <h2>Categories</h2>
      </button>

      <button className='add-category-button' onClick={openCategoryForm}>
        <AddCategoryIcon className='app-sidebar-icon' width={16} height={16} />
      </button>
    </div>
  )
}

export default CategoryTitle