import CollapseIcon from '../../Icons/CollapseIcon'
import AddCategoryIcon from '../../Icons/AddCategoryIcon'

import '../style.scss'

type Props = {}

export default function index({ }: Props) {
  return (
    <div className='category-title'>
      <button className='collapse-button'>
        <CollapseIcon isCollapsed={false} className='app-sidebar-icon' width={16} height={16} />

        <h2>Categories</h2>
      </button>

      <button className='add-category-button'>
        <AddCategoryIcon className='app-sidebar-icon' width={16} height={16} />
      </button>
    </div>
  )
}