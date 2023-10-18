import moment from 'moment';
import JSZip from 'jszip';
import { useAppSelector } from '../../../hooks/hooks'
import { selectCategories } from '../../../store/categories/categorySlice'
import { selectNotes } from '../../../store/notes/notesSlice'
import DownloadIcon from '../../Icons/DownloadIcon'
import ExportIcon from '../../Icons/ExportIcon'
import ImportIcon from '../../Icons/ImportIcon'
import './style.scss'

type Props = {}

export default function DataManagement({ }: Props) {
  const notes = useAppSelector(selectNotes)
  const categories = useAppSelector(selectCategories)

  const downloadAllNotes = () => {
    const zip = new JSZip()

    notes.forEach((note) => {
      const { created, lastUpdated, text } = note

      let category: string | undefined
      category = categories.find((category) => category.id === note.category)?.name
      if (category === undefined) category = ''

      let title: string = note.text
      title = title.split('\n')[0].split('#')[0].substring(0, 40)

      const formattedNote = `---\ntitle: ${title}\ncreated: ${moment(created).format()}\nlastUpdated: ${moment(lastUpdated).format()}\ncategory: ${category}\n---\n\n${text}`

      zip.file(`${title}.md`, formattedNote)
    })

    zip.generateAsync({ type: 'blob' })
      .then((blob) => {
        const zipFileName = 'notes.zip'
        const a = document.createElement('a')

        a.href = URL.createObjectURL(blob)
        a.download = zipFileName
        a.click()

        URL.revokeObjectURL(a.href)
      });
  }

  const exportNotes = () => {
    const exportData = {
      notes,
      categories
    }

    const blob = new Blob([JSON.stringify(exportData)], { type: 'json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = `takenote-backup-${moment().format('YYYY-MM-DD')}.json`
    a.click()

    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      <h3>Data management</h3>
      <p>Download all notes as Markdown files in a zip.</p>

      <button
        data-testid='settings-modal-download-notes'
        aria-label='Download all notes'
        title='Download all notes'
        className='icon-button'
        onClick={downloadAllNotes}
      >
        <DownloadIcon className='tabs-icon' width={18} height={18} />

        Download all notes
      </button>

      <p>Export TakeNote data as JSON.</p>

      <button
        aria-label='Export backup'
        title='Export backup'
        className='icon-button'
        onClick={exportNotes}
      >
        <ExportIcon className='tabs-icon' width={18} height={18} />

        Export backup
      </button>

      <p>Import TakeNote JSON file.</p>

      <div>
        <input
          data-testid='upload-settings-backup'
          accept='.json'
          tabIndex={-1}
          autoComplete='off'
          type='file'
          className='hidden'
        />
        <button
          aria-label='Import backup'
          title='Import backup'
          className='icon-button'
        >
          <ImportIcon className='tabs-icon' width={18} height={18} />

          Import backup
        </button>
      </div>
    </>
  )
}