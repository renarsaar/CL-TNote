import { useState } from 'react'
import ReactDOM from 'react-dom'
import ConfigsModalHeader from './ConfigsModalHeader'
import TabList from './TabList'
import Preferences from './Preferences'
import KeyboardShortcuts from './KeyboardShortcuts'
import DataManagement from './DataManagement'
import About from './About'
import './style.scss'

type Props = {
  isShowing: boolean,
  hide: () => void
}

export type ActiveTab = 'Preferences' | 'Shortcuts' | 'Data' | 'About'

const ConfigsModal = ({ isShowing, hide }: Props) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Preferences');

  const switchTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name }: any = e.currentTarget;

    setActiveTab(name);
  }

  const onModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <>
      {isShowing && ReactDOM.createPortal(
        <>
          <div className='modal-overlay' />
          <div
            className='modal-wrapper'
            aria-modal
            aria-hidden
            tabIndex={-1}
            role='dialog'
          >
            <div className='configs-modal' onClick={onModalClick}>
              <ConfigsModalHeader onClick={hide} />

              <div className='configs-content'>
                <TabList switchTab={switchTab} activeTab={activeTab} />

                <div className='tab-content'>
                  {activeTab === 'Preferences' && <Preferences />}
                  {activeTab === 'Shortcuts' && <KeyboardShortcuts />}
                  {activeTab === 'Data' && <DataManagement />}
                  {activeTab === 'About' && <About />}
                </div>
              </div>
            </div>
          </div>
        </>, document.body
      )}
    </>
  )
}

export default ConfigsModal;