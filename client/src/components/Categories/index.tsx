import CategoryTitle from './CategoryTitle';
import CategoryIcon from '../Icons/CategoryIcon';

type Props = {}

export default function index({ }: Props) {
  return (
    <>
      <CategoryTitle />

      <div className='category-list'>
        <div
          tabIndex={0}
          role="button"
          draggable="false"
          className="category-list-item"
        >
          <div className="category-list-name">
            <CategoryIcon />

            Dev
          </div>
        </div>

        <div
          tabIndex={0}
          role="button"
          draggable="false"
          className="category-list-item"
        >
          <div className="category-list-name">
            <CategoryIcon />

            Work
          </div>
        </div>
      </div>
    </>
  )
}