import { useEffect, useContext, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { ConfigContext, ResizerContext } from '../context'
import { selectNavigation } from '../store/navigation/navigationSlice'
import { getNotes } from '../store/notes/notesSlice'
import { selectScratchpad } from '../store/scratchpad/scratchpadSlice'
import AppSidebar from '../layouts/AppSidebar'
import NoteSideBar from '../layouts/NoteSidebar'
import NoteEditor from '../layouts/NoteEditor'
import Editor from './Editor'
import '../assets/style.scss'
import NoteMenuBar from '../layouts/NoteMenuBar'

function App() {
  const dispatch = useAppDispatch()
  const tab = useAppSelector(selectNavigation)
  const splitPanelElement = useRef<HTMLDivElement>(null)
  const { configs } = useContext(ConfigContext)
  const { theme } = configs
  const {
    appSideBarDrag, noteSideBarDrag, handleAppSideBarWidth, handleNoteSideBarWidth, appSideBarWidth
  } = useContext(ResizerContext)
  const scratchpad = useAppSelector(selectScratchpad)

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])

  const handleOnMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX } = e

    if (appSideBarDrag) {
      const minWidth: number = 180
      const maxWidth: number = 330
      const newWidth: number = Math.min(Math.max(clientX, minWidth), maxWidth)

      handleAppSideBarWidth(newWidth)
    }

    if (noteSideBarDrag) {
      const minWidth: number = 25;
      const maxWidth: number = 480
      const newNoteSideBarWidth: number = Math.min(Math.max(clientX - appSideBarWidth, minWidth), maxWidth)

      handleNoteSideBarWidth(newNoteSideBarWidth)
    }
  }

  return (
    <div className="App" style={theme === 'light' ? { color: '#d0d0d0' } : { color: '#7a7a7a' }}>

      <div className="container" onMouseMove={handleOnMouseMove} ref={splitPanelElement}>
        <AppSidebar />

        <div className='panel'>
          <div className='panel-split'>
            <NoteSideBar />

            {tab.scratchpad !== true
              ? <NoteEditor />
              : <div className='codemirror'>
                <Editor
                  noteId={scratchpad.id}
                  text={scratchpad.text}
                  scratchpad={true}
                />

                <NoteMenuBar />
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
