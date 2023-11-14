import { useEffect, useContext, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { ResizerContext } from '../context'
import { selectNavigation } from '../store/navigation/navigationSlice'
import { getNotes } from '../store/notes/notesSlice'
import { selectScratchpad } from '../store/scratchpad/scratchpadSlice'
import AppSidebar from '../layouts/AppSidebar'
import NoteSideBar from '../layouts/NoteSidebar'
import CodeMirror from '../layouts/CodeMirror'
import NoteMenuBar from '../layouts/NoteMenuBar'
import Editor from './Editor'
import '../assets/style.scss'

const App = () => {
  const splitPanelElement = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const { tab } = useAppSelector(selectNavigation)
  const scratchpad = useAppSelector(selectScratchpad)
  const {
    appSideBarDrag, noteSideBarDrag, handleAppSideBarWidth, handleNoteSideBarWidth, appSideBarWidth
  } = useContext(ResizerContext)

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
    <div className="App">

      <div className="container" onMouseMove={handleOnMouseMove} ref={splitPanelElement}>
        <AppSidebar />

        <div className='panel'>
          <div className='panel-split'>
            <NoteSideBar />

            {tab !== 'scratchpad'
              ? <CodeMirror />
              : (
                <div className='codemirror'>
                  <Editor
                    noteId={scratchpad.id}
                    text={scratchpad.text}
                    scratchpad={true}
                  />

                  <NoteMenuBar />
                </div>
              )
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
