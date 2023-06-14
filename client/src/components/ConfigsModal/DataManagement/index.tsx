import DownloadIcon from '../../Icons/DownloadIcon'
import ExportIcon from '../../Icons/ExportIcon'
import ImportIcon from '../../Icons/ImportIcon'
import './style.scss'

type Props = {}

export default function DataManagement({ }: Props) {
  return (
    <>
      <h3>Data management</h3>
      <p>Download all notes as Markdown files in a zip.</p>

      <button
        data-testid='settings-modal-download-notes'
        aria-label='Download all notes'
        title='Download all notes'
        className='icon-button'
      >
        <DownloadIcon className='tabs-icon' width={18} height={18} />

        Download all notes
      </button>

      <p>Export TakeNote data as JSON.</p>

      <button
        aria-label='Export backup'
        title='Export backup'
        className='icon-button'
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