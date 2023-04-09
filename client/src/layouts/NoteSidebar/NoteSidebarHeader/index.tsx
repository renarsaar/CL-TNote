import './style.scss'

type Props = {}

export default function index({ }: Props) {
  return (
    <div className='note-sidebar-header'>
      <input
        data-testid="note-search"
        type="search"
        placeholder="Search for notes"
      />
    </div>
  )
}