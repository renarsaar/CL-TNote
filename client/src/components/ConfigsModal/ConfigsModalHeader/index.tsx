import CloseIcon from '../../Icons/CloseIcon'
import './style.scss'

type Props = {
  onClick: () => void
}

export default function ConfigsModalHeader({ onClick }: Props) {
  return (
    <div className='configs-modal-header'>
      <div className='profile-details'>
        <h1>Demo User</h1>

        <button className='btn-primary'>Log out</button>
      </div>

      <button
        type='button'
        className='modal-close-btn'
        data-dismiss='modal'
        aria-label='close'
        onClick={onClick}
      >
        <CloseIcon width={20} height={20} />
      </button>
    </div>
  )
}