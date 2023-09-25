import { useAppSelector } from '../../../../hooks/hooks';
import { selectNavigation } from '../../../../store/navigation/navigationSlice';
import './style.scss'

type Option = {
  id: string;
  name: string;
}

const MoveToCategorySelect = () => {
  const { tab } = useAppSelector(selectNavigation)

  return tab !== 'trash' ? (
    <select className='move-to-category-select' defaultValue='Move to category'>
      <option disabled={true} value='Move to category'>Move to category...</option>
      <option value='test'>Test</option>
    </select>
  ) : null
}

export default MoveToCategorySelect