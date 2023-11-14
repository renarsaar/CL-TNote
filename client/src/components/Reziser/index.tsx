import { useContext } from 'react'
import { ConfigContext } from '../../context'
import { ResizerContext } from '../../context/ResizerContext'
import { ConfigContextState } from '../../context/types'
import './style.scss'

type Props = {
  component: 'AppSideBar' | 'NoteSideBar'
}

export default function Resizer({ component }: Props) {
  const { handleAppSideBarDrag, handleNoteSideBarDrag } = useContext(ResizerContext)
  const { configs: { theme } } = useContext<ConfigContextState>(ConfigContext)

  const handleMouseDown = () => {
    component === 'NoteSideBar'
      ? handleNoteSideBarDrag(true)
      : handleAppSideBarDrag(true)
  }

  const handleMouseUp = () => {
    component === 'NoteSideBar'
      ? handleNoteSideBarDrag(false)
      : handleAppSideBarDrag(false)
  }

  return (
    <span
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      role='presentation'
      className={theme === 'light' ? 'resizer vertical' : 'resizer vertical dark-mode'}
    />
  )
}
