import './style.scss'

const EmptyNote = () => {
  return (
    <div className='empty-note'>
      <div className='settings-shortcut'>
        <h1>Create a note</h1>

        <div className='keys'>
          <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>N</kbd>
        </div>
      </div>
    </div>
  )
}

export default EmptyNote