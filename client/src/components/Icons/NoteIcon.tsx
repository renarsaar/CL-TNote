type Props = {
  className: 'app-sidebar-icon' | 'note-sidebar-icon';
  width: number;
  height: number;
}

export default function NoteIcon({ className, width, height }: Props) {
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
      <path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'></path>
      <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'></path>
    </svg>
  )
}