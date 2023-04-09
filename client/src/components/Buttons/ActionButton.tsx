type Props = {}

export default function ActionButton({ }: Props) {
  return (
    <button className='action-button'>
      <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.25)' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='action-button-icon' aria-hidden='true' focusable='false'>
        <line x1='12' y1='5' x2='12' y2='19'></line>
        <line x1='5' y1='12' x2='19' y2='12'></line>
      </svg>

      <span>New note</span>
    </button>
  )
}