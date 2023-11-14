type Props = {
  className: 'tab-btn-icon';
  width: number;
  height: number;
}

export default function DataManagementIcon({ className, width, height }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
      focusable='false'
    >
      <polyline points='21 8 21 21 3 21 3 8'></polyline>
      <rect x='1' y='3' width='22' height='5'></rect>
      <line x1='10' y1='12' x2='14' y2='12'></line>
    </svg>
  )
}