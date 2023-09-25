type Props = {
  className: 'options-context-icon';
  width: number;
  height: number;
}

const RestoreFromTrashIcon = ({ className, width, height }: Props) => {
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
      <line x1='12' y1='19' x2='12' y2='5'></line>
      <polyline points='5 12 12 5 19 12'></polyline>
    </svg>
  )
}

export default RestoreFromTrashIcon