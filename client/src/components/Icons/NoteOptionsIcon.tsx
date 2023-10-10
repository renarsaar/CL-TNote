type Props = {
  className: 'app-sidebar-context-icon' | 'note-sidebar-icon' | 'note-sidebar-icon-active'
  width: number
  height: number
  onClick: (e: React.MouseEvent<SVGElement>) => void
}

export default function NoteOptionsIcon({ className, width, height, onClick }: Props) {
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
      aria-hidden='true'
      className={className}
      onClick={onClick}
      id='note-options-ellips-icon'
    >
      <circle cx='12' cy='12' r='1'></circle>
      <circle cx='19' cy='12' r='1'></circle>
      <circle cx='5' cy='12' r='1'></circle>
    </svg>
  )
}