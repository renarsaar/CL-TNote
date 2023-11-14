import { Fragment, useContext } from 'react'
import { ConfigContext } from '../../../context'
import { ConfigContextState } from '../../../context/types'
import './style.scss'

type KeyboardShortcutsProps = { name: string, sequences: string[] }[]

export default function KeyboardShortcuts() {
  const { configs: { theme } } = useContext<ConfigContextState>(ConfigContext)

  const keyboardShortcuts: KeyboardShortcutsProps = [
    { name: 'Create a new note', sequences: ['CTRL', 'ALT', 'N'] },
    { name: 'Delete a note', sequences: ['CTRL', 'ALT', 'U'] },
    { name: 'Create a category', sequences: ['CTRL', 'ALT', 'C'] },
    { name: 'Download a note', sequences: ['CTRL', 'ALT', 'O'] },
    { name: 'Sync all notes', sequences: ['CTRL', 'ALT', 'L'] },
    { name: 'Markdown preview', sequences: ['CTRL', 'ALT', 'P'] },
    { name: 'Toggle theme', sequences: ['CTRL', 'ALT', 'K'] },
    { name: 'Search notes', sequences: ['CTRL', 'ALT', 'F'] },
    { name: 'Prettify a note', sequences: ['CTRL', 'ALT', 'I'] },
  ]

  return (
    <>
      <h3>Keyboard Shortcuts</h3>

      {keyboardShortcuts.map((shortcut) => (
        <div className={theme === 'light' ? 'settings-shortcut' : 'settings-shortcut dark-mode'} key={shortcut.name}>
          <div>{shortcut.name}</div>

          <div className='keys'>
            {shortcut.sequences.map((key: string, i: number, array: string[]) => (
              <Fragment key={i}>
                <kbd>{key}</kbd>
                {i + 1 === array.length ? '' : ' + '}
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}