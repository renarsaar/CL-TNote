type Props = {
  isCollapsed: boolean;
  className: 'app-sidebar-icon' | 'app-sidebar-icon collapsed';
  width: number;
  height: number;
}

export default function CollapseIcon({ isCollapsed, className, width, height }: Props) {
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
    >
      {isCollapsed === true
        ? <polyline points='9 18 15 12 9 6'></polyline>
        : <polyline points='6 9 12 15 18 9'></polyline>}
    </svg>
  )
}