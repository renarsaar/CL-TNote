type Props = {
  className: 'tabs-icon';
  width: number;
  height: number;
}

export default function ImportIcon({ className, width, height }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      stroke='rgba(255, 255, 255, 0.25)'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
      focusable='false'
    >
      <polyline points='16 16 12 12 8 16'></polyline>
      <line x1='12' y1='12' x2='12' y2='21'></line>
      <path d='M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3'></path>
      <polyline points='16 16 12 12 8 16'></polyline>
    </svg>
  )
}