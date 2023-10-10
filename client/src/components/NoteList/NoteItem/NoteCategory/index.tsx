import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../hooks/hooks'
import { selectCategories } from '../../../../store/categories/categorySlice'
import CategoryIcon from '../../../Icons/CategoryIcon'
import NoteIcon from '../../../Icons/NoteIcon'

type Props = {
  category: string | null
}

const NoteCategory = ({ category }: Props) => {
  const categories = useAppSelector(selectCategories)
  const [categoryName, setCategoryName] = useState<string | null>(null)

  useEffect(() => {
    const findCategory = categories.find((c) => c.id === category)

    setCategoryName(findCategory?.name || null)
  }, [categories, category])

  return (
    <div className="note-category">
      {categoryName !== null
        ? (
          <>
            <CategoryIcon className='note-sidebar-icon' width={15} height={15} />

            {categoryName}
          </>
        )
        : (
          <>
            <NoteIcon className='note-sidebar-icon' width={15} height={15} />

            Notes
          </>
        )
      }
    </div>
  )
}

export default NoteCategory