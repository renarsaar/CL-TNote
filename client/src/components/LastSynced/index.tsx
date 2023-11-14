import { useContext } from 'react'
import moment from 'moment'
import './style.scss'
import { ConfigContextState } from '../../context/types'
import { ConfigContext } from '../../context'

const LastSynced = () => {
  const { configs: { theme } } = useContext<ConfigContextState>(ConfigContext)
  const lastSyncedDate: string = `${moment().format('LT')} on ${moment().format('L')}`

  return (
    <div className={theme === 'light' ? 'last-synced' : 'last-synced dark-mode'}>
      <span data-testid='last-synced-notification-date'>
        {lastSyncedDate}
      </span>
    </div>
  )
}

export default LastSynced