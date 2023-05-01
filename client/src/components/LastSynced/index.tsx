import moment from 'moment'

import './style.scss'

export default function LastSynced() {
  return (
    <div className='last-synced'>
      <span data-testid='last-synced-notification-date'>
        {`${moment().format('LT')} on ${moment().format('L')}`}
      </span>
    </div>
  )
}