import NoteSidebarHeader from './NoteSidebarHeader'
import NoteList from '../../components/NoteList'
import './style.scss'

type Props = {}

export default function index({ }: Props) {
  return (
    <div className='note-sidebar-container'>
      <aside className='note-sidebar'>
        <NoteSidebarHeader />

        <NoteList />
      </aside>
    </div>
  )
}