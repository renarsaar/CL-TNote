import { useContext } from 'react'
import { ConfigContextState } from '../../context/types'
import { ConfigContext } from '../../context'
import NavFunctions from './NavFunctions'
import NavOptions from './NavOptions'
import './style.scss'

const NoteMenuBar = () => {
  const { configs: { theme } } = useContext<ConfigContextState>(ConfigContext)

  return (
    <div className={theme === 'light' ? 'note-menu-bar' : 'note-menu-bar dark-mode'}>
      <NavFunctions />

      <NavOptions />
    </div>
  )
}

export default NoteMenuBar