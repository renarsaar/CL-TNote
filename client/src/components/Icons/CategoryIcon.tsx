type Props = {
  className: 'app-sidebar-icon' | 'note-sidebar-icon';
  width: number;
  height: number;
}


export default function CategoryIcon({ className, width, height }: Props) {
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
    >
      <path d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'></path>
    </svg>
  )
}