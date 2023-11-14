import { useContext } from 'react'
import { ConfigContext } from '../../context'
import { ConfigContextState } from '../../context/types'
import './style.scss'

const EmptyNote = () => {
  const { configs: { theme } } = useContext<ConfigContextState>(ConfigContext)

  return (
    <div className={theme === 'light' ? 'empty-note' : 'empty-note dark-mode'}>
      <div className='settings-shortcut'>
        <h1>Create a note</h1>

        <div className='keys'>
          <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>N</kbd>
        </div>
      </div>
    </div>
  )
}

export default EmptyNote