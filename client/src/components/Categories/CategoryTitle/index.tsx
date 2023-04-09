import CollapseIcon from '../../Icons/CollapseIcon'
import AddCategoryIcon from '../../Icons/AddCategoryIcon'

import '../style.scss'

type Props = {}

export default function index({ }: Props) {
  return (
    <div className='category-title'>
      <button className='collapse-button'>
        <CollapseIcon isCollapsed={false} />

        <h2>Categories</h2>
      </button>

      <button className='add-category-button'>
        <AddCategoryIcon />
      </button>
    </div>
  )
}