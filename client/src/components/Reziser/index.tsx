import { useContext } from 'react'
import { ResizerContext } from '../../context/ResizerContext'
import './style.scss'

type Props = {
  component: 'AppSideBar' | 'NoteSideBar'
}

export default function Resizer({ component }: Props) {
  const { handleAppSideBarDrag, handleNoteSideBarDrag } = useContext(ResizerContext);

  const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    component === 'NoteSideBar'
      ? handleNoteSideBarDrag(true)
      : handleAppSideBarDrag(true)
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    component === 'NoteSideBar'
      ? handleNoteSideBarDrag(false)
      : handleAppSideBarDrag(false)
  }

  return (
    <span
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      role='presentation'
      className='resizer'
    />
  )
}
