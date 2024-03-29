type Props = {
  className: 'note-menu-bar-icon' | 'options-context-icon';
  width: number;
  height: number;
}

export default function ClipboardIcon({ className, width, height }: Props) {
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
      focusable='false'
      className={className}
    >
      <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path>
      <rect x='8' y='2' width='8' height='4' rx='1' ry='1'></rect>
    </svg>
  )
}