import Note from './Note';
import './style.scss'

type Props = {}

const notes: string[] = ['Welcome to Takenote!', 'Slack sync', 'PS meeting'];

export default function index({ }: Props) {
  return (
    <div className="note-list">
      {notes.map((note, i) => <Note key={i} note={note} />)}
    </div>
  )
}