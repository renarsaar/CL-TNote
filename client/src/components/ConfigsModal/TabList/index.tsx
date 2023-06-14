import AboutIcon from '../../Icons/AboutIcon'
import ConfigsIcon from '../../Icons/ConfigsIcon'
import DataManagementIcon from '../../Icons/DataManagementIcon'
import KeyboardShortcutsIcon from '../../Icons/KeyboardShortcutsIcon'
import { ActiveTab } from '..'
import './style.scss'


type Props = {
  switchTab: (e: React.MouseEvent<HTMLButtonElement>) => void;
  activeTab: ActiveTab;
}

const TabList = ({ switchTab, activeTab }: Props) => {
  const highlightActiveTab = (tabName: ActiveTab): string => {
    return activeTab === tabName ? 'tab active' : 'tab'
  }

  return (
    <nav className='tab-list'>
      <button className={highlightActiveTab('Preferences')} name='Preferences' onClick={switchTab}>
        <ConfigsIcon className='tab-button-icon' width={18} height={18} />

        Preferences
      </button>

      <button className={highlightActiveTab('Shortcuts')} name='Shortcuts' onClick={switchTab}>
        <KeyboardShortcutsIcon className='tab-button-icon' width={18} height={18} />

        Keyboard shortcuts
      </button>

      <button className={highlightActiveTab('Data')} name='Data' onClick={switchTab}>
        <DataManagementIcon className='tab-button-icon' width={18} height={18} />

        Data management
      </button>

      <button className={highlightActiveTab('About')} name='About' onClick={switchTab}>
        <AboutIcon className='tab-button-icon' width={18} height={18} />

        About TakeNote
      </button>
    </nav>
  )
}

export default TabList