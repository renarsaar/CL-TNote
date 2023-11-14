import { useContext } from 'react'
import { ConfigContext } from '../../../context'
import { ConfigContextState } from '../../../context/types'
import useModal from '../../../hooks/useModal'

import ConfigsModal from '../../../components/ConfigsModal'
import ConfigsIcon from '../../../components/Icons/ConfigsIcon'
import DarkModeIcon from '../../../components/Icons/DarkModeIcon'
import LightModeIcon from '../../../components/Icons/LightModeIcon'
import SyncNotesIcon from '../../../components/Icons/SyncNotesIcon'
import LastSynced from '../../../components/LastSynced'

const NavOptions = () => {
  const { configs, configs: { theme }, addConfig } = useContext<ConfigContextState>(ConfigContext)
  const { isShowing, toggle } = useModal()

  const changeTheme = () => {
    addConfig(configs, {
      'key': 'theme',
      'value': theme === 'dark' ? 'light' : 'dark'
    })

    theme === 'light'
      ? document.documentElement.setAttribute('data-color-mode', 'dark')
      :
      document.documentElement.setAttribute('data-color-mode', 'light')
  }

  return (
    <nav>
      <LastSynced />

      <button className='note-menu-bar-button'>
        <SyncNotesIcon
          className='note-menu-bar-icon'
          width={18}
          height={18}
        />
      </button>

      <button className='note-menu-bar-button' onClick={changeTheme}>
        {theme === 'dark'
          ? <LightModeIcon
            className='note-menu-bar-icon'
            width={18}
            height={18}
          />
          : <DarkModeIcon
            className='note-menu-bar-icon'
            width={18}
            height={18}
          />
        }
      </button>

      <button className='note-menu-bar-button' onClick={toggle}>
        <ConfigsIcon
          className='note-menu-bar-icon'
          width={18} height={18}
        />
        <ConfigsModal isShowing={isShowing} hide={toggle} />
      </button>
    </nav>
  )
}

export default NavOptions