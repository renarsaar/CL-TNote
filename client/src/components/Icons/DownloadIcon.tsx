type Props = {
  className: 'tabs-icon' | 'options-context-icon';
  width: number;
  height: number;
}

export default function DownloadIcon({ className, width, height }: Props) {
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
      <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
      <polyline points='7 10 12 15 17 10'></polyline>
      <line x1='12' y1='15' x2='12' y2='3'></line>
    </svg>
  )
}