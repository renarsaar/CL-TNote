type Props = {
  isCollapsed: boolean,
}

export default function CollapseIcon({ isCollapsed }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='collapse-button-icon'
    >
      {isCollapsed === true
        ? <polyline points='9 18 15 12 9 6'></polyline>
        : <polyline points='6 9 12 15 18 9'></polyline>}
    </svg>
  )
}