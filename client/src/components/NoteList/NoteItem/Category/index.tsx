import { useEffect, useState } from 'react'
import { Note } from '../../../../interfaces/Note'
import CategoryIcon from '../../../Icons/CategoryIcon'
import NoteIcon from '../../../Icons/NoteIcon'
import { useAppSelector } from '../../../../hooks/hooks'
import { selectCategories } from '../../../../store/categories/categorySlice'

type Props = {
  note: Note
}

const Category = ({ note }: Props) => {
  const categories = useAppSelector(selectCategories)
  const [category, setCategory] = useState<string | null>(null)

  useEffect(() => {
    categories.forEach((item) => {
      if (item.id === note.category) {
        setCategory(item.name)
      }
    })
  }, [categories, note.category])


  return (
    <div className="note-category">
      {category !== null
        ? (
          <>
            <CategoryIcon className='note-sidebar-icon' width={15} height={15} />

            {category}
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

export default Category