import './style.scss';

type Props = {
  className: 'app-sidebar-icon' | 'note-sidebar-favorites-icon' | 'note-menu-bar-icon' | 'note-menu-bar-icon-favorited' | 'options-context-icon';
  width: number;
  height: number;
}

export default function FavoritesIcon({ className, width, height }: Props) {
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
      <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
    </svg>
  )
}